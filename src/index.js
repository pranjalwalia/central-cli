#!/usr/bin/env node
const commander = require("commander");

const { init } = require("./commands/init");
const { gitignore } = require("./commands/gitignore");
const { search, stackoverflow, youtube, google } = require("./commands/search");
const { fastcommit, fastpush } = require("./commands/fastcommit");
const { changesToPush } = require("./commands/push-diff");

const { inputstring } = require("./utils");

commander.version("0.0.1");

//! git utilites
commander.command("init").description("run the central cli").action(init);

commander
  .command("ignore")
  .description(
    "generate a preset gitignore for a language or modify existing one"
  )
  .alias("ig")
  .action(gitignore);

commander
  .command("fastcommit")
  .description("perform a fast commit with a message")
  .alias("fci")
  .action(() => {
    const msg = inputstring();
    fastcommit(msg);
  });

commander
  .command("rem-commit <branch>")
  .description(
    "check the commits that need to be pushed on the current branch to another branch"
  )
  .alias("rmc")
  .action((branch) => {
    changesToPush(branch);
  });

commander
  .command("fastpush")
  .description("perform a fast commit and a push on your current branch")
  .alias("fp")
  .action(() => {
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
