const chalk = require("chalk");
const axios = require("axios");
const { prompt } = require("inquirer");
const { baseURl } = require("../config");

const questions = [
  {
    type: "input",
    name: "query",
    message: "Enter you query",
  },
];

const search = async () => {
  const input = await prompt(questions);
  const res = await axios.get(`${baseURl}?query=${input.query}`);

  //todo: format this response so it looks good
  console.log(chalk.green(JSON.stringify(res.data)));
};

const stackoverflow = async () => {
  const input = await prompt(questions);
  const res = await axios.get(`${baseURl}/stackoverflow?query=${input.query}`);

  //todo: format this response so it looks good
  console.log(chalk.green(JSON.stringify(res.data)));
};

const youtube = async () => {
  const input = await prompt(questions);
  const res = await axios.get(`${baseURl}/youtube?query=${input.query}`);

  //todo: format this response so it looks good
  console.log(chalk.green(JSON.stringify(res.data)));
};

module.exports = { search, stackoverflow, youtube };
