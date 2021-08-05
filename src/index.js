#!/usr/bin/env node

const commander = require("commander");
const { init } = require("./commands/init");
const { search } = require("./commands/search");

commander.command("init").description("run the central cli").action(init);
commander
  .command("search")
  .description("search various forums with a single line query")
  .action(search);

commander.parse(process.argv);

if (!commander.args.length) {
  commander.help();
}
