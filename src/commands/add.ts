import { Command } from "commander";
import { returnUrl, runShadcn } from "@/utils";
export const add = new Command();
add
  .name("add")
  .description(
    "add a component to your project, equivalent to shadcn@latest add component"
  )
  .argument("[components...]", "names, url or local path to component")
  .action(async (args: string[]) => {
    const baseUrl = returnUrl(args[0]);
    const componentsArray = baseUrl === "" ? args : args.slice(1);

    const components = componentsArray.map((item) => baseUrl + item);
    await runShadcn(components);
  });
