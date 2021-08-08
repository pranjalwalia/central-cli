const chalk = require("chalk");
const figlet = require("figlet");
const clear = require("clear");
const inquirer = require("inquirer");
const { authenticate } = require("../libs/auth.js");
const { createRepo, ignoreFiles, initialCommit } = require("../libs/repo.js");

// handle all repo initializer workflow
const init = async () => {
  clear();
  console.log(
    chalk.magentaBright(
      figlet.textSync("Dev Central", { horizontalLayout: "full" })
    )
  );
  console.log(
    chalk.green("Welcome to the central cli tool, give the `-h` flag for help")
  );

  const questions = [
    {
      name: "proceed",
      type: "input",
      message: "Proceed to push this project to a Github remote repo?",
      choices: ["Yes", "No"],
      default: "Yes",
    },
  ];

  const answer = await inquirer.prompt(questions);
  if (answer.proceed == "Yes") {
    console.log(chalk.blue("Authenticating..."));

    // authenticate the oauth token
    const octokit = await authenticate();
    console.log(chalk.blue("Initializing new remote repo..."));

    // create the repo post auth
    const url = await createRepo(octokit);

    console.log(chalk.blue("Remote repo created. Choose files to ignore."));

    // gigignore
    await ignoreFiles();

    console.log(
      chalk.blue("Committing files to GitHub at: " + chalk.yellow(url))
    );

    // make the initial commit
    const commit = await initialCommit(url);

    // if it doesnt fail
    if (commit) {
      console.log(
        chalk.green("Your project has been successfully committed to Github!")
      );
    }
  } else {
    console.log(chalk.blue("Okay, bye."));
  }
};

module.exports = { init };
