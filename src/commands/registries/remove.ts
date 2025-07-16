import path from "node:path";
import { Command } from "commander";
import type { RegistriesSchema } from "@/schema";
import { readRegistry, writeToFile } from "@/utils";
import { highlighter, logger } from "@/utils/highlighter";
export const removeCmd = new Command("remove");
removeCmd
  .description("remove a registry")
  .argument("<name>", "name of the registry")
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .action((name, opts) => {
    const values = readRegistry(opts.cwd);

    const registryPath = path.resolve(opts.cwd);
    const valuePresent = values.registries?.find((reg) => reg.name === name);
    if (!valuePresent) {
      logger.error(`${name} is not registered`);
      logger.info(
        "first add it using",
        highlighter.bold(highlighter.warn(`npx doctcn add ${name}`))
      );
      process.exit(0);
    }
    if (values.registries?.length <= 1) {
      logger.error(`unable to remove ${name}\n`);
      logger.warn(
        highlighter.bold("registries.json must contain at-least 1 value.")
      );
      process.exit(0);
    }
    const newData: RegistriesSchema = {
      default: values.default,
      registries: values.registries?.filter((reg) => reg.name !== name),
    };
    const writeSuccess = writeToFile(registryPath, newData, true);
    if (!writeSuccess) {
      return;
    }
    logger.success(`removed ${name} from registry.`);
  });
