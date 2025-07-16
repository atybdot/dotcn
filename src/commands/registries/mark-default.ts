import path from "node:path";
import { Command } from "commander";
import { FILE_NAME } from "@/constants";
import type { RegistriesSchema } from "@/schema";
import { readRegistry, writeToFile } from "@/utils";
import { highlighter, logger } from "@/utils/highlighter";
export const markDefaultCmd = new Command("mark-default");
markDefaultCmd
  .description("mark registry as default ")
  .argument("<name>", "name of the registry")
  .option("-c,--cwd <cwd>", "specify folder for registries.json", process.cwd())
  .action((name, opts) => {
    const values = readRegistry(opts.cwd);
    const basePath = path.resolve(opts.cwd);
    const registryPath = `${basePath}/${FILE_NAME}`;
    const valuePresent = values.registries?.find((reg) => reg.name === name);
    if (!valuePresent) {
      logger.error(
        `❌ ${highlighter.warn(
          highlighter.underline(name)
        )} is not present in ${highlighter.underline(
          FILE_NAME
        )}.\nIf you are trying to add a registery then run \n${highlighter.warn(
          `npx dotcn add ${name} <url>`
        )}`
      );
      process.exit(0);
    }
    if (values.default.name === name) {
      logger.success(
        `${name} is already marked as ${highlighter.underline("Default")} ✅`
      );
      logger.info("If you are trying to remove it run");
      logger.warn(`npx dotcn remove ${name}`);
      process.exit(0);
    }
    const newData: RegistriesSchema = {
      default: values.registries.find((reg) => reg.name === name)!,
      registries: values?.registries,
    };
    const writeSuccess = writeToFile(registryPath, newData, true, true);
    if (!writeSuccess) {
      logger.error(
        `Unable to mark ${highlighter.underline(name)} as Default ❌`
      );
      return;
    }
    logger.success(
      `Successfully marked ${highlighter.underline(name)} as Default ✅`
    );
  });
