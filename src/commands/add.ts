import { Command } from "commander";
import { returnUrl, runShadcn } from "@/utils";
export const add = new Command();
add
  .name("add")
  .description(
    "add a component to your project, equivalent to shadcn@latest add component"
  )
  .argument("[components...]", "names, url or local path to component")
  .option("-d, --default", "use default registry if the")
  .action(async (args: string[], opts) => {
    const baseUrl = await returnUrl(args[0], opts.default);
    const componentsArray = args.slice(1);

    const components = componentsArray.map((item) => `${baseUrl + item}.json`);
    await runShadcn(components);
  });
