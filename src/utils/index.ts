import fs from "node:fs";
import path from "node:path";
import { execa, type Options, type ResultPromise } from "execa";
import { z } from "zod/v4";
import { FILE_NAME } from "@/constants";
import { registriesSchema } from "@/schema";
import { highlighter, logger } from "./highlighter";
export function checkFileExists(absoluteFilePath: string): boolean {
  const absPath = path.join(absoluteFilePath);
  const fileExists = fs.existsSync(absPath);
  if (!fileExists) {
    logger.error(`unable to find ${highlighter.bold(absoluteFilePath)}`);
  }
  return fileExists;
}

export function readRegistry(cwd?: string) {
  const absPath = path.resolve(cwd ? cwd : process.cwd(), FILE_NAME);
  try {
    const registryFile = fs.readFileSync(absPath, "utf-8");
    const jsonValues = JSON.parse(registryFile);
    const safeValues = registriesSchema.parse(jsonValues);
    return safeValues;
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.error(
        "registries.json is not in correct format, please make sure that it has correct schema"
      );
    } else if (error instanceof Error) {
      logger.error(
        "unable to read registry file\nensure that registries.json is present along with components.json\n",
        error?.message
      );
    }
    process.exit(1);
  }
}

export function returnUrl(key: string) {
  const values = readRegistry();
  const res = values.registries?.find((item) => item.name === key);
  if (!res || res === undefined) {
    logger.warn(`${key} not found in ${FILE_NAME}\nusing default registry.`);
    return values.default.url;
  }
  return res?.url;
}

export function runCommand(
  command: string,
  args?: string[],
  option?: Options
): ResultPromise {
  try {
    const res = execa(command, args, {
      stderr: option?.stderr ?? "inherit",
      stdin: option?.stdin ?? "inherit",
      stdout: option?.stdout ?? "inherit",
      reject: true,
      ...option,
    });
    return res;
  } catch (error) {
    //@ts-expect-error <error should have message property>
    logger.error("unable to run command\n", error?.message);
    process.exit(1);
  }
}
export async function runShadcn(components: string[]) {
  const command = [
    "pnpm",
    ["dlx", "shadcn@latest", "add", ...components].join(" "),
  ].join(" ");
  try {
    logger.info(command);
    await runCommand("pnpm", ["dlx", "shadcn@latest", "add", ...components]);
  } catch (_error) {
    logger.error("unable to run\n", highlighter.bold(command));
  }
}

export function writeToFile(
  absoluteFilePath: string,
  data: any,
  isJson = false,
  silent = true
) {
  try {
    if (isJson) {
      fs.writeFileSync(absoluteFilePath, JSON.stringify(data, null, 2));
    } else {
      fs.writeFileSync(absoluteFilePath, data);
    }
    !silent &&
      logger.success(
        `successfully created ${highlighter.bold(absoluteFilePath)}`
      );
    return true;
  } catch (error) {
    logger.error(`failed to create ${highlighter.bold(absoluteFilePath)}`);
    //@ts-expect-error <error must contain message property>
    logger.info(error?.message);
    return false;
  }
}
