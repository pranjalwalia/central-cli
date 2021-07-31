#!/usr/bin/env node
import commander from "commander";
import { init } from "./commands/init.js";

commander.command("init").description("run the central cli").action(init);

commander.parse(process.argv);
if (!commander.args.length) {
  commander.help();
}
