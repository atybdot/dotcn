import { Command } from "commander";
import packageJson from "../package.json";
import { execa } from "execa";
const program = new Command();

program
  .name("dotcn")
  .description(
    (packageJson.description ||
      "Simple CLI tool to install shadcn compatible components from various ui-libraries such as magic-ui, aceternity-ui or hexta-ui")
  )
  .version(
    packageJson.version || "0.0.0",
    "-v, --version",
    "display the version number"
  );

const register = new Command();
register.name("register").description("manage registries");

register
  .command("add")
  .description("add a registry")
  .argument("<name>", "name of the registry, will be used as ID")
  .argument(
    "<url>",
    "url, where components are located such, as https://magicui.design/r/"
  )
  .action(async (...args) => {
    console.log(args[0],args[1]);
  });

register
  .command("remove")
  .description("remove a registry")
  .argument("<name>", "name of the registry")
  .action((...args) => {
    console.log(args[0]);
  });

register
  .command("default")
  .description("mark registry as default ")
  .argument("<name>", "name of the registry")
  .action((...args) => {
    console.log(args[0]);
  });
program.addCommand(register);

program.parse();
