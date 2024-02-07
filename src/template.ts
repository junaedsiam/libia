import { PackageManagers, PromptOptions, Templates } from "./type";
import { getDefaultEntry } from "./utils";
import path from "node:path";
import fs from "node:fs/promises";
import chalk from "chalk";
import { promisify } from "node:util";
import ncp from "ncp";
//@ts-ignore
import { execa } from "execa";

const copy = promisify(ncp);

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

export async function prepareTemplate(
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
  await renameEntryFile(options, targetDir);
  await updatePackageJson(options, targetDir);
  await addConfigJson(options, targetDir);
}

export async function initializeGit(targetDir: string) {
  const result = await execa("git", ["init"], {
    cwd: targetDir,
  });
  if (result.failed) {
    return Promise.reject(new Error("Failed to initialize git"));
  }
  return;
}

export async function installDeps(
  pkgManager: PackageManagers,
  targetDir: string
) {
  // const result = await execa(pkgManager, args, getExecaConfig(config));
  await execa(pkgManager, ["install"], { cwd: targetDir });
}
