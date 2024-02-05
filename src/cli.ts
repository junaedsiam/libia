import { promisify } from "node:util";
import path from "node:path";
import fs from "node:fs";
import ncp from "ncp";
import { InvalidArgError } from "./error";
import { initiatePrompt } from "./prompt";
import { PromptOptions, Templates } from "./type";
import chalk from "chalk";
import { getDefaultEntry } from "./utils";

const fsAccess = promisify(fs.access);
const copy = promisify(ncp);
const fsRename = promisify(fs.rename);

const INIT = "init";

function parseArguments(args: string[]) {
  if (!args[0] || args[0] !== INIT || !args[1]) {
    throw new InvalidArgError(
      `format: "libia init ." or "libia init <your-lib-name>"`
    );
  }

  return args;
}

function getTemplateName(options: PromptOptions) {
  const { framework, isTypescript } = options;
  return (framework + (isTypescript ? "-ts" : "")) as Templates;
}

async function renameEntryFile(options: PromptOptions, targetDir: string) {
  const defaultFile = getDefaultEntry(options.isTypescript);
  // If user has proceeded with default, do not have to rename
  if (options.entryFileName === defaultFile) {
    return;
  }
  await fsRename(
    path.join(targetDir, "src", defaultFile),
    path.join(targetDir, "src", options.entryFileName)
  );
}

async function provideTemplateBasedOnOptions(
  options: PromptOptions,
  targetDir: string
) {
  const templateName = getTemplateName(options);
  const src = path.join(__dirname, "..", `templates/${templateName}`);

  try {
    await fsAccess(src, fs.constants.R_OK);
  } catch (err) {
    console.error("%s Invalid template name", chalk.red.bold("ERROR"));
    process.exit(1);
  }
  // Copy initial template
  await copy(src, targetDir, {
    clobber: false,
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
  // Rename entry file if required
  await renameEntryFile(options, targetDir);
  // Todo: update package.json with lib info

  // Todo: Put libia.config.json with user given options
}

export async function cli(rawArgs: string[]): Promise<void> {
  const args = parseArguments(rawArgs.slice(2));

  const options: PromptOptions = await initiatePrompt();
  // take the options
  console.log(options);

  await provideTemplateBasedOnOptions(options, path.basename(args[1]));
}
