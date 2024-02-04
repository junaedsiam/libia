import { promisify } from "node:util";
import path from "node:path";
import fs from "node:fs";
import ncp from "ncp";
import { InvalidArgError } from "./error";
import { initiatePrompt } from "./prompt";
import { PromptOptions } from "./type";
import chalk from "chalk";

const access = promisify(fs.access);
const copy = promisify(ncp);

const INIT = "init";

function parseArguments(args: string[]) {
  if (!args[0] || args[0] !== INIT || !args[1]) {
    throw new InvalidArgError();
  }

  return args;
}

function getTemplateName(options: PromptOptions) {
  const { template, isTypescript } = options;
  return template + (isTypescript ? "-ts" : "");
}

async function provideTemplateBasedOnOptions(
  options: PromptOptions,
  targetDir: string
) {
  const templateName = getTemplateName(options);
  const src = path.join(process.cwd(), `templates/${templateName}`);

  try {
    await access(src, fs.constants.R_OK);
  } catch (err) {
    console.error("%s Invalid template name", chalk.red.bold("ERROR"));
    process.exit(1);
  }

  copy(templateName, targetDir, {
    clobber: false,
    // Excluding template files for later processing
    filter: (filename: string) => {
      if (filename.endsWith(".ejs")) {
        return false;
      }
      return true;
    },
  }).catch((err) => console.log(err));
}

export async function cli(rawArgs: string[]): Promise<void> {
  const args = parseArguments(rawArgs.slice(2));

  const options: PromptOptions = await initiatePrompt();
  // take the options
  console.log(options);

  await provideTemplateBasedOnOptions(options, path.basename(args[1]));
}
// Extract information about template from template + isTypescript
// entryFileName + outputFileName + injectCssInJs -> put it in vite config
