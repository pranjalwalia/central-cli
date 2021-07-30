#!/usr/bin/env node
import commander from "commander";
import chalk from "chalk";
import figlet from "figlet";
import clear from "clear";

//! list out commands
commander
  .command("init")
  .description("run the central cli")
  .action(async () => {
    clear();
    console.log(
      chalk.magentaBright(
        figlet.textSync("Dev Central", { horizontalLayout: "full" })
      )
    );
  });

//! args parsing errors
commander.parse(process.argv);
if (!commander.args.length) {
  commander.help();
}
