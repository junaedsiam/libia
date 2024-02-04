import select from "@inquirer/select";
import confirm from "@inquirer/confirm";
import input from "@inquirer/input";
import { templates } from "./constants";

export async function initiatePrompt() {
  const template = await select({
    message: "Choose Project Template: ",
    choices: templates,
    default: templates[0].value,
  });

  const isTypescript = await confirm({
    message: "Want to use Typescript?",
    default: true,
  });

  const entryFileName = await input({
    message: "Entry file : src /",
    default: "index.ts",
    validate: (val: string) => {
      if (!val) return true;
      const expectedExt = isTypescript ? ".ts" : ".js";
      return val.endsWith(expectedExt)
        ? true
        : `Filename must end with ${expectedExt}`;
    },
  });
  const outputFileName = await input({
    message: "Output file : dist /",
    default: "index.js",
    validate: (val: string) => {
      if (!val) {
        return true;
      }
      return val.endsWith(".js") ? true : "Filename must end with .js";
    },
  });

  const seperateCss = await confirm({
    message: "Want to seperate CSS file from JS? ",
    default: true,
  });

  return {
    template,
    isTypescript,
    entryFileName,
    outputFileName,
    injectCssInJs: !seperateCss,
  };
}
