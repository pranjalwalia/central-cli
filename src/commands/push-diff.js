const shell = require("shelljs");
const chalk = require("chalk");

const changesToPush = async (branch) => {
  const branchOutput = shell.exec("git rev-parse --abbrev-ref HEAD");
  const currentBranchEscaped = branchOutput.stdout;
  const currentBranch = currentBranchEscaped.substring(
    0,
    currentBranchEscaped.length - 1
  );
  if (!currentBranch) {
    console.log(chalk.red("something went wrong"));
    return;
  }
  console.log(chalk.green(`<<< commits to push to ${branch} >>>`));
  const res = shell.exec(
    `git --no-pager log origin/${currentBranch}..${branch} -n 50`
  );
  console.log(chalk.green(">>>"));
  console.log(
    `${chalk.green(
      res.stdout.toString().match(/commit/g).length,
      "COMMITS TO PUSH"
    )} `
  );
};

module.exports = { changesToPush };
