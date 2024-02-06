import { promisify } from "node:util";
import path from "node:path";
import fs from "node:fs/promises";
import ncp from "ncp";
import { InvalidArgError } from "./error";
import { initiatePrompt } from "./prompt";
import { PromptOptions, Templates } from "./type";
import chalk from "chalk";
import { getDefaultEntry } from "./utils";

const copy = promisify(ncp);

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
  if (options.entry === defaultFile) {
    return;
  }
  await fs.rename(
    path.join(targetDir, "src", defaultFile),
    path.join(targetDir, "src", options.entry)
  );
}

async function updatePackageJson(options: PromptOptions, targetDir: string) {
  const packageJsonPath = path.join(targetDir, "package.json");
  const { packageName } = options;

  const packageJsonContent = await fs.readFile(packageJsonPath, "utf8");
  const packageJson = JSON.parse(packageJsonContent);

  packageJson.name = path.basename(packageName);

  // Additional lib configuration
  packageJson.main = `./dist/${packageName}.umd.cjs`;
  packageJson.module = `./dist/${packageName}.js`;
  packageJson.exports = {
    ".": {
      import: `./dist/${packageName}.js`,
      require: `./dist/${packageName}.umd.cjs`,
    },
  };

  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

async function addConfigJson(options: PromptOptions, targetDir: string) {
  const configFilePath = path.join(targetDir, "config.json");
  const { entry, packageName, injectCssInJs } = options;
  await fs.writeFile(
    configFilePath,
    JSON.stringify(
      {
        entry: path.join("src", entry),
        packageName,
        injectCssInJs,
      },
      null,
      2
    )
  );
}

async function provideTemplateBasedOnOptions(
  options: PromptOptions,
  targetDir: string
) {
  const templateName = getTemplateName(options);
  const src = path.join(__dirname, "..", `templates/${templateName}`);

  await fs.access(src, fs.constants.R_OK).catch((err) => {
    console.error("%s Invalid template name", chalk.red.bold("ERROR"));
    process.exit(1);
  });

  // Copy initial template
  await copy(src, targetDir, {
    clobber: false,
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
  // Rename entry file if required
  await renameEntryFile(options, targetDir);
  // update package.json with lib info + name of the package
  await updatePackageJson(options, targetDir);
  // config.json with user given options
  await addConfigJson(options, targetDir);
}

export async function cli(rawArgs: string[]): Promise<void> {
  const args = parseArguments(rawArgs.slice(2));

  const options: PromptOptions = await initiatePrompt();
  // take the options
  console.log(options);

  await provideTemplateBasedOnOptions(options, path.basename(args[1]));
}
