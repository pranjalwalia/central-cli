const chalk = require("chalk");
const figlet = require("figlet");
const clear = require("clear");
const { prompt } = require("inquirer");
const { authenticate } = require("../libs/auth.js");
const { createRepo, ignoreFiles, initialCommit } = require("../libs/repo.js");

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
      choices: ["yes", "no"],
      default: "yes",
    },
  ];

  const answer = await prompt(questions);

  if (answer.proceed == "yes") {
    console.log(chalk.blue("Authenticating..."));
    const octokit = await authenticate();
    console.log(chalk.blue("Initializing new remote repo..."));
    const url = await createRepo(octokit);
    // console.log(url);

    console.log(chalk.blue("Remote repo created. Choose files to ignore."));
    await ignoreFiles();

    console.log(
      chalk.blue("Committing files to GitHub at: " + chalk.yellow(url))
    );
    const commit = await initialCommit(url);
    if (commit) {
      console.log(
        chalk.green("Your project has been successfully committed to Github!")
      );
    }
  } else {
    console.log(chalk.red("Aborting.."));
  }
};

module.exports = { init };
