import select from "@inquirer/select";
import confirm from "@inquirer/confirm";
import input from "@inquirer/input";
import { frameworks } from "./constants";
import { getDefaultEntry } from "./utils";
import validateNpmPackageName from "validate-npm-package-name";

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

  return {
    framework,
    isTypescript,
    entry,
    packageName,
    injectCssInJs: !seperateCss,
  };
}
