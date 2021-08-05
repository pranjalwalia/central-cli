#!/usr/bin/env node

const commander = require("commander");
const { init } = require("./commands/init");
const { search, stackoverflow, youtube, google } = require("./commands/search");

commander.command("init").description("run the central cli").action(init);

commander
  .command("search")
  .alias("s")
  .description("search various forums with a single line query")
  .action(search);

commander
  .command("stackoverflow")
  .alias("st")
  .description("search stackoverflow")
  .action(stackoverflow);

commander
  .command("youtube")
  .alias("yt")
  .description("search youtube")
  .action(youtube);

commander
  .command("google")
  .alias("g")
  .description("search google")
  .action(google);

commander.parse(process.argv);

if (!commander.args.length) {
  commander.help();
}
