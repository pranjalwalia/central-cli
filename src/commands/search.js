const chalk = require("chalk");
const axios = require("axios");
const columnify = require("columnify");
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

  console.log(
    `\n` +
      chalk.yellowBright(
        `STACKOVERFLOW\n` +
          columnify(res.data.stackoverflow, {
            minWidth: 20,
            columnSplitter: "|",
            config: { title: { maxWidth: 50 } },
          })
      ) +
      `\n`
  );

  console.log(
    `\n` +
      chalk.redBright(
        `YOUTUBE\n` +
          columnify(res.data.youtube, {
            minWidth: 20,
            columnSplitter: "|",
            config: { title: { maxWidth: 50 } },
          })
      ) +
      `\n`
  );

  console.log(
    `\n` +
      chalk.blueBright(
        `GOOGLE\n` +
          columnify(res.data.google, {
            minWidth: 20,
            columnSplitter: "|",
            config: { title: { maxWidth: 50 } },
          })
      ) +
      `\n`
  );
};

const stackoverflow = async () => {
  const input = await prompt(questions);
  const res = await axios.get(`${baseURl}/stackoverflow?query=${input.query}`);

  console.log(
    `\n` +
      chalk.yellowBright(
        `STACKOVERFLOW\n` +
          columnify(res.data.stackoverflow, {
            minWidth: 20,
            columnSplitter: "|",
            config: { title: { maxWidth: 50 } },
          })
      ) +
      `\n`
  );
};

const youtube = async () => {
  const input = await prompt(questions);
  const res = await axios.get(`${baseURl}/youtube?query=${input.query}`);

  console.log(
    `\n` +
      chalk.redBright(
        `YOUTUBE\n` +
          columnify(res.data.youtube, {
            minWidth: 20,
            columnSplitter: "|",
            config: { title: { maxWidth: 50 } },
          })
      ) +
      `\n`
  );
};

const google = async () => {
  const input = await prompt(questions);
  const res = await axios.get(`${baseURl}/google?query=${input.query}`);

  console.log(
    `\n` +
      chalk.blueBright(
        `GOOGLE\n` +
          columnify(res.data.google, {
            minWidth: 20,
            columnSplitter: "|",
            config: { title: { maxWidth: 50 } },
          })
      ) +
      `\n`
  );
};

module.exports = { search, stackoverflow, youtube, google };
