const { default: axios } = require("axios");
const { exec } = require("child_process");
const { prompt } = require("inquirer");

// default gitignore options
const questions = [
  {
    type: "checkbox",
    name: "ignore",
    message: "Select one language/framework to generate a default gitignore:",
    choices: [
      "Node",
      "Python",
      "Ruby",
      "Android",
      "Dart",
      "Go",
      "Rust",
      "Swift",
      "Rails",
      "Java",
      "C++",
      "C",
      "Elixir",
      "Gradle",
      "Maven",
      "Kotlin",
      "AppEngine",
      "Tex",
    ],
  },
];

// gitignore generator here
const gitignore = async () => {
  const input = await prompt(questions);
  if (input.ignore) {
    exec(`npx gitignore ${input.ignore[0]}`, (error, stdout, stderr) => {
      console.log(stdout);
      if (error !== null) {
        console.log("exec error: " + error);
      }
    });
  }
};

module.exports = { gitignore };
