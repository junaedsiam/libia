import { InvalidArgError } from "./error";
import select from "@inquirer/select";
import confirm from "@inquirer/confirm";
import input from "@inquirer/input";
import { templates } from "./constants";

const INIT = "init";

function parseArguments(args: string[]) {
  return args;
}

async function initiatePrompt() {
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
      const expectedExt = isTypescript ? ".ts" : ".js";
      return val.endsWith(expectedExt)
        ? true
        : `Filename must end with ${expectedExt}`;
    },
  });
  const outputFileName = await input({
    message: "Output file : dist /",
    default: "index.js",
    validate: (val: string) =>
      val.endsWith(".js") ? true : "Filename must end with .js",
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

export async function cli(rawArgs: string[]): Promise<void> {
  const args = parseArguments(rawArgs.slice(2));
  if (args[0] !== INIT) {
    throw new InvalidArgError();
  }
  const options = await initiatePrompt();
  // take the options
  console.log(options);
}
