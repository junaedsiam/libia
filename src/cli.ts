import { Listr } from "listr2";
import { InvalidArgError } from "./error.js";
import { initiatePrompt } from "./prompt.js";
import { initializeGit, installDeps, prepareTemplate } from "./template.js";
import { type PromptOptions, type TaskCtx } from "./type.js";
import boxen from "boxen";
import path from "node:path";
import { fileURLToPath } from "node:url";
import chalk from "chalk";

const INIT = "init";

function parseArguments(args: string[]) {
  if (!args[0] || args[0] !== INIT || !args[1]) {
    throw new InvalidArgError(
      'format: "libia init ." or "libia init <your-lib-name>"'
    );
  }

  return args;
}

export async function cli(rawArgs: string[]): Promise<void> {
  try {
    const args = parseArguments(rawArgs.slice(2));

    const options: PromptOptions = await initiatePrompt();

    const tasks = new Listr<TaskCtx>(
      [
        {
          title: "Preparing template",
          task: async (ctx) => {
            await prepareTemplate(ctx.options, ctx.targetDir);
          },
        },
        {
          title: "Initializing git",
          task: async (ctx) => {
            await initializeGit(ctx.targetDir);
          },
        },
        {
          title: "installing dependencies",
          task: async (ctx) => {
            await installDeps(ctx.options.packageManager, ctx.targetDir);
          },
        },
      ],
      { ctx: { options, targetDir: args[1] } }
    );

    await tasks.run();

    // attach specific dir name here
    const repoPath = path.join(process.cwd(), args[1]);
    console.log(
      boxen(chalk.green.bold("All done!"), {
        padding: 2,
        borderStyle: "round",
        borderColor: "green",
      })
    );
    console.log(
      chalk.green.bold(`Head into ${repoPath}\nBuild something amazing`)
    );
  } catch (err) {
    console.error(err);
  }
}
