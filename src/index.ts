import { Command } from "commander";

import packageJson from "../package.json" with { type: "json" };
import { add } from "./commands/add";
import { initCmd } from "./commands/init";
import { registry } from "./commands/registries";
import { logger } from "./utils/highlighter";

const program = new Command();

program
  .name("dotcn")
  .description(
    packageJson.description ||
      "Simple CLI tool to install shadcn compatible components from various ui-libraries such as magic-ui, aceternity-ui or hexta-ui"
  )
  .version(
    packageJson.version || "0.0.0",
    "-v, --version",
    "display the version number"
  );

program.addCommand(registry);
program.addCommand(initCmd);
program.addCommand(add);
program.parse();
process.on('uncaughtException', (error) => {
  if (error instanceof Error) {
    logger.error('Operation Cancelled ❌');
  } else {
    // Rethrow unknown errors
    throw error;
  }
});