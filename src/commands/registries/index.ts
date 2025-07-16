import { Command } from "commander";
import { addCmd } from "./add";
import { markDefaultCmd } from "./mark-default";
import { removeCmd } from "./remove";
export const registry = new Command();
registry.name("registries").description("manage registries");
registry.addCommand(addCmd);
registry.addCommand(removeCmd);
registry.addCommand(markDefaultCmd);
