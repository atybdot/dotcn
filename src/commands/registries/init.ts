import path from "node:path";
import { confirm } from "@inquirer/prompts";
import { Command } from "commander";
import { FILE_NAME } from "@/constants";
import type { BaseSchema, RegistriesSchema } from "@/schema";
import { checkFileExists, writeToFile } from "@/utils";
import { highlighter, logger } from "@/utils/highlighter";
import { runPreflight } from "@/utils/preflight";
export const initCmd = new Command("init");

initCmd
  .description("initialize a dotcn project")
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .option("-d, --default", "mark this registry as default", false)
  .action(async (opts) => {
    const basePath = path.resolve(opts.cwd);
    const registryPath = path.resolve(basePath, FILE_NAME);

    const passPreflight = await runPreflight({ basePath });
    if (!passPreflight) {
      logger.error(highlighter.bold("program aborted!!!"));
      process.exit(1);
    }
    await runInit({ cwd: registryPath, assure: false, changeDefault: false });
  });

interface Props {
  data?: BaseSchema;
  assure: boolean;
  changeDefault: boolean;
  cwd: string;
  customLog?: string;
}

export async function runInit({
  assure = false,
  changeDefault = false,
  ...props
}: Props) {
  const checkRegistry = checkFileExists(props.cwd);
  const defaultValues: BaseSchema = {
    name: "shadcn",
    url: "https://ui.shadcn.com/r/styles/new-york-v4/",
  };

  if (checkRegistry) {
    logger.info(`${FILE_NAME} already present.`);
    logger.log(
      `run ${highlighter.warn(highlighter.underline("npx dotcn add button"))}`
    );
    return;
  }

  if (assure) {
    const reassure = await confirm({
      message: `Do you want to create ${highlighter.info(FILE_NAME)}?`,
    });
    if (!reassure) {
      logger.error(
        `Cannot continue without creating ${highlighter.info(FILE_NAME)}`,
        highlighter.bold("Program aborted")
      );
      process.exit(1);
    }
  }
  const defaultReg = changeDefault && props?.data ? props?.data : defaultValues;
  const dataToWrite: RegistriesSchema = {
    default: defaultReg,
    registries: props?.data ? [defaultValues, props.data] : [defaultValues],
  };

  const writeSuccess = writeToFile(props.cwd, dataToWrite, true);
  if (!writeSuccess) {
    return;
  }
  logger.success(
    `successfully added ${props?.data ? props.data.name : defaultValues.name} registry.`
  );
  logger.log(
    props?.customLog
      ? props?.customLog
      : `run ${highlighter.warn(highlighter.underline("npx dotcn add button"))}`
  );
}
