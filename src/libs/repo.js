const path = require("path");
const inquirer = require("inquirer");
const fs = require("fs");
const glob = require("glob");
const git = require("simple-git");

/**
 * utility functions for interacting with the github api
 * */
const gitOps = git();

// create a repo with a given name
const createRepo = async (octokit) => {
  const questions = [
    {
      name: "name",
      type: "input",
      message: "Enter new repo name",
      default: path.basename(process.cwd()),
      validate: (value) => {
        if (value.length) {
          return true;
        } else {
          return "Please enter a valid input.";
        }
      },
    },
    {
      name: "description",
      type: "input",
      message: "Enter new repo description (optional).",
      default: null,
    },
    {
      name: "visibility",
      type: "input",
      message: "Set repo to public or private?",
      choices: ["public", "private"],
      default: "private",
    },
  ];

  const answers = await inquirer.prompt(questions);
  const data = {
    name: answers.name,
    description: answers.description,
    private: answers.visibility === "private",
  };

  try {
    const response = await octokit.repos.createForAuthenticatedUser(data);
    return response.data.clone_url;
  } catch (error) {
    console.log("Something is wrong at repo creation", error.message);
  }
};

// initialising a gitignore
const ignoreFiles = async () => {
  const files = glob.sync("**/*", { ignore: "**/node_modules/**" });
  const defaultIgnore = [
    "/build",
    ".env",
    ".DS_Store",
    "/coverage",
    ".env.local",
    ".env.development.local",
    ".env.test.local",
    ".env.production.local",
  ];

  fs.writeFileSync(".gitignore", defaultIgnore.join("\n") + "\n");

  //ignore any node_modules by default
  const filesToIgnore = glob.sync("{*/node_modules/,node_modules/}");
  if (filesToIgnore.length) {
    fs.appendFileSync(".gitignore", filesToIgnore.join("\n") + "\n");
  } else {
    fs.closeSync(fs.openSync(".gitignore", "w"));
  }

  const question = [
    {
      type: "checkbox",
      name: "ignore",
      message: "Select the file and/or folders you wish to ignore:",
      choices: files,
    },
  ];

  const answers = await inquirer.prompt(question);
  if (answers.ignore.length) {
    fs.appendFileSync(".gitignore", answers.ignore.join("\n"));
  }
};

// making the initial commit
const initialCommit = async (url) => {
  try {
    await gitOps
      .init()
      .add(".gitignore")
      .add("./*")
      .commit("Initial commit")
      .addRemote("origin", url);
    await gitOps.push(url, "master", ["--set-upstream"]);
    return true;
  } catch (error) {
    console.log("Something is wrong at initialCommit", error.message);
  }
};

module.exports = { initialCommit, ignoreFiles, createRepo };
