import fs from "node:fs";
import { Command } from "commander";
import { FILE_NAME } from "@/constants";
import type { RegistriesSchema } from "@/schema";
import { readRegistry } from "@/utils";
export const markDefaultCmd = new Command("mark-default");
markDefaultCmd
  .description("mark registry as default ")
  .argument("<name>", "name of the registry")
  .option("-c,--cwd <cwd>", "specify folder for registries.json", process.cwd())
  .action((name, opts) => {
    const values = readRegistry(opts.cwd);
    const valuePresent = values.registries?.find((reg) => reg.name === name);
    if (!valuePresent) {
      console.error(
        `${name} is not registered.\nIf you are trying to add a registery then run \nnpx dotcn add ${name} <url>`
      );
      process.exit(0);
    }
    if (values.default.name === name) {
      console.log(
        `${name} is already marked as default\nif you are trying to remove it\nrun npx dotcn remove ${name}`
      );
      process.exit(0);
    }
    const newData: RegistriesSchema = {
      default: values.registries.find((reg) => reg.name === name)!,
      registries: values?.registries,
    };
    fs.writeFileSync(FILE_NAME, JSON.stringify(newData, null, 2));
  });
