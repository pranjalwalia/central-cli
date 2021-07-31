import chalk from "chalk";
import figlet from "figlet";
import clear from "clear";
import inquirer from "inquirer";
import { authenticate } from "../libs/auth.js";
import { createRepo, ignoreFiles, initialCommit } from "../libs/repo.js";

export const init = async () => {
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
    const octokit = await authenticate();
    console.log(chalk.blue("Initializing new remote repo..."));
    const url = await createRepo(octokit);

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
    console.log(chalk.blue("Okay, bye."));
  }
};
