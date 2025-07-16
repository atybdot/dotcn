import { Command } from "commander";

import packageJson from "../package.json" with { type: "json" };
import { add } from "./commands/add";
import { registry } from "./commands/registries";

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
program.addCommand(add);
program.parse();
