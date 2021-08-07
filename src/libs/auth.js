const { inquirer } = require("inquirer");
const { Octokit } = require("@octokit/rest");
const Configstore = require("configstore");
const { name } = require("../../package.json");

// initialise usr config to store the github oauthtoken
// oauth token is required for interacting with the github api
const config = new Configstore(name);

// authentication prerequisites with the github api
const authenticate = async () => {
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

module.exports = { config, authenticate };
