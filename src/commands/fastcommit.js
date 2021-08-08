const shell = require("shelljs");
const chalk = require("chalk");

const fastcommit = (message) => {
  shell.exec("git add .");
  shell.exec(`git commit -m "${message}"`);
  console.log(chalk.green(`commit success "${message}"`));
};

const fastpush = (message) => {
  shell.exec("git add .");
  shell.exec(`git commit -m "${message}"`);
  shell.exec("git push origin HEAD");
  shell.exec("git branch --show-current");
  console.log(chalk.green(`"${message}" pushed`));
};

module.exports = { fastcommit, fastpush };
