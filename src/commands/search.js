const chalk = require("chalk");
const { prompt } = require("inquirer");

const questions = [
  {
    type: "input",
    name: "firstname",
    message: "Enter you query enclosed in quotes",
  },
];

const search = () => {
  prompt(questions);
};

module.exports = { search };
