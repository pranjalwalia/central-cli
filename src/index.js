#!/usr/bin/env node
const commander = require("commander");

const { init } = require("./commands/init");
const { gitignore } = require("./commands/gitignore");
const { search, stackoverflow, youtube, google } = require("./commands/search");
const { fastcommit, fastpush } = require("./commands/fastcommit");
const { inputstring } = require("./utils");

//! git utilites
commander.command("init").description("run the central cli").action(init);

commander
  .command("ignore")
  .description("generate a gitignore or modify existing one")
  .alias("ig")
  .action(gitignore);

commander
  .command("fastcommit")
  .description("perform a fast commit with a message")
  .alias("fci")
  .action(() => {
    //todo: update this args
    const msg = inputstring();
    fastcommit(msg);
  });

commander
  .command("fastpush")
  .description("perform a fast commit and a push on your current branch")
  .alias("fp")
  .action(() => {
    //todo: update this args
    const msg = inputstring();
    fastpush(msg);
  });

//! search utils
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
