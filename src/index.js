#!/usr/bin/env node

const commander = require("commander");

/**
 * import utilities
 */
const { init } = require("./commands/init");
const { gitignore } = require("./commands/gitignore");
const { search, stackoverflow, youtube, google } = require("./commands/search");

//! git utility commands for the cli
commander.command("init").description("run the central cli").action(init);

commander
  .command("ignore")
  .description("generate a gitignore or modify existing one")
  .alias("ig")
  .action(gitignore);

//! search utility commands for the cli
commander
  .command("search")
  .alias("s")
  .description("search various forums with a single line query")
  .action(search);

//! search stackoverflow specifically
commander
  .command("stackoverflow")
  .alias("st")
  .description("search stackoverflow")
  .action(stackoverflow);

//! search yt specifically
commander
  .command("youtube")
  .alias("yt")
  .description("search youtube")
  .action(youtube);

//! search google specifically
commander
  .command("google")
  .alias("g")
  .description("search google")
  .action(google);

//parse the args on the commandline
commander.parse(process.argv);

if (!commander.args.length) {
  commander.help();
}
