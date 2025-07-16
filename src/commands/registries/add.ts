import path from "node:path";
import { Command } from "commander";
import { FILE_NAME } from "@/constants";
import type { RegistriesSchema } from "@/schema";
import { checkFileExists, readRegistry, writeToFile } from "@/utils";
import { highlighter, logger } from "@/utils/highlighter";

import { runInit } from "./init";

export const addCmd = new Command("add");
addCmd
  .description("add a registry")
  .argument("<name>", "name of the registry, will be used as ID")
  .argument(
    "<url>",
    "url, where components are located such, as https://magicui.design/r/"
  )
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .option("-d, --default", "mark this registry as default", false)
  .action(async (name, url, opts) => {
    const basePath = path.resolve(opts.cwd);
    const newRegistry = { name, url };
    const registryPath = `${basePath}/${FILE_NAME}`;
    try {
      new URL(url);
    } catch (_e) {
      logger.error(
        "Unable to validate URL\n provide correct URL for ",
        highlighter.bold(name)
      );
      process.exit(1);
    }

    // check wether registries.json exists
    const registriesCheck = checkFileExists(registryPath);
    if (registriesCheck) {
      const values = readRegistry();
      const defaultValue = opts.default ? newRegistry : values.default;
      const alreadyRegistered = values.registries?.find(
        (reg) => reg.name === name || reg.url === url
      );
      if (alreadyRegistered) {
        logger.warn("Registry is already present.");
        logger.info(
          `If you are trying to mark ${name} as default\nUse ${highlighter.warn(
            highlighter.bold("mark-default")
          )} command`
        );
      } else {
        const newData: RegistriesSchema = {
          default: defaultValue,
          registries: [...values.registries, newRegistry],
        };
        const writeSuccess = writeToFile(registryPath, newData, true);
        if (!writeSuccess) {
          logger.error(
            "Failed to write data to ",
            highlighter.underline(registryPath)
          );
        }
        logger.success(
          `"Successfully added ${highlighter.bold(name)} to ${FILE_NAME}"`
        );
      }
    } else {
      await runInit({
        cwd: registryPath,
        changeDefault: opts?.default ?? false,
        assure: true,
        data: newRegistry,
      });
    }
  });
