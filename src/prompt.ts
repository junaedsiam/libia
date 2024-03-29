import select from "@inquirer/select";
import confirm from "@inquirer/confirm";
import input from "@inquirer/input";
import validateNpmPackageName from "validate-npm-package-name";
import { frameworks, packageManagers } from "./constants.js";
import { getDefaultEntry } from "./utils.js";

export async function initiatePrompt() {
  const packageName = await input({
    message: "Enter your package name:",
    validate: (val: string) => {
      if (!val) {
        return "Package name is required";
      }
      if (!validateNpmPackageName(val).validForNewPackages) {
        return "Please provide a valid name that follows npm guidelines";
      }
      return true;
    },
  });
  const framework = await select({
    message: "Choose Project framework: ",
    choices: frameworks,
    default: frameworks[0].value,
  });

  const isTypescript = await confirm({
    message: "Want to use Typescript?",
    default: true,
  });

  const entry = await input({
    message: "Entry file : src /",
    default: getDefaultEntry(isTypescript),
    validate: (val: string) => {
      if (!val) return true;
      const expectedExt = isTypescript ? ".ts" : ".js";
      return val.endsWith(expectedExt)
        ? true
        : `Filename must end with ${expectedExt}`;
    },
  });

  const seperateCss = await confirm({
    message: "Want to seperate CSS file from JS? ",
    default: true,
  });

  const packageManager = await select({
    message: "Choose a package manager: ",
    choices: packageManagers,
    default: packageManagers[0].value,
  });

  return {
    framework,
    isTypescript,
    entry,
    packageName,
    injectCssInJs: !seperateCss,
    packageManager,
  };
}
