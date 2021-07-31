import { createRequire } from "module";
const require = createRequire(import.meta.url);

import inquirer from "inquirer";
import { Octokit } from "@octokit/rest";
import Configstore from "configstore";
const { name } = require("../../package.json");
import path from "path";

export const config = new Configstore(name);

export const authenticate = async () => {
  let token = config.get("github_token");
  if (token) {
    try {
      const octokit = new Octokit({
        auth: token,
      });
      return octokit;
    } catch (err) {
      throw err;
    }
  } else {
    const questions = [
      {
        name: "token",
        type: "input",
        message: "Enter your Github personal access token.",
        validate: (value) => {
          if (value.length == 40) {
            return true;
          } else return "Please enter a valid token.";
        },
      },
    ];

    const answer = await inquirer.prompt(questions);
    try {
      const octokit = new Octokit({
        auth: answer.token,
      });
      config.set("github_token", answer.token);
      return octokit;
    } catch (error) {
      console.log("Something is wrong at authenticate", error.message);
    }
  }
};
