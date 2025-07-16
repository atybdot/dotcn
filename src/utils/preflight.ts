import { confirm } from "@inquirer/prompts";
import { checkFileExists, runCommand } from ".";
import { highlighter, logger } from "./highlighter";

interface props {
  basePath: string;
}
export async function runPreflight({ basePath }: props) {
  const checkComponentsFile = checkFileExists(`${basePath}/components.json`);
  if (!checkComponentsFile) {
    logger.error(
      `please run ${highlighter.warn("npx shadcn@latest init")} to create it.`
    );
    const createComponents = await confirm({
      message: `Do you want to run ${highlighter.warn(
        "npx shadcn@latest init"
      )} ?: `,
    });
    if (!createComponents) {
      logger.info(
        highlighter.italic(
          "cannot continue without components.json\ncreate it before running this command"
        )
      );
      return false;
    }
    try {
      await runCommand("pnpm", ["dlx", "shadcn@latest", "init"]);
      return true;
    } catch (error) {
      logger.error("unable to create components.json");
      logger.info(
        highlighter.italic(
          "cannot continue without components.json\ncreate it before running this command"
        )
      );
      //@ts-expect-error <>
      logger.error(error?.message);
      return false;
    }
  }
  return true;
}
