import { Listr } from "listr2";
import { InvalidArgError } from "./error";
import { initiatePrompt } from "./prompt";
import { initializeGit, installDeps, prepareTemplate } from "./template";
import { PromptOptions, TaskCtx } from "./type";

const INIT = "init";

function parseArguments(args: string[]) {
  if (!args[0] || args[0] !== INIT || !args[1]) {
    throw new InvalidArgError(
      `format: "libia init ." or "libia init <your-lib-name>"`
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
          task: (ctx) => prepareTemplate(ctx.options, ctx.targetDir),
        },
        {
          title: "Initializing git",
          task: (ctx) => initializeGit(ctx.targetDir),
        },
        {
          title: "installing dependencies",
          task: (ctx) => installDeps(ctx.options.packageManager, ctx.targetDir),
        },
      ],
      { ctx: { options, targetDir: args[1] } }
    );

    await tasks.run();
  } catch (err) {
    console.error(err);
  }
}
