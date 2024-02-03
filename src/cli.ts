import { InvalidArgError } from "./error";
import { initiatePrompt } from "./prompt";
const INIT = "init";

function parseArguments(args: string[]) {
  if (!args[0] || args[0] !== INIT || !args[1]) {
    throw new InvalidArgError();
  }

  return args;
}

export async function cli(rawArgs: string[]): Promise<void> {
  const args = parseArguments(rawArgs.slice(2));

  const options = await initiatePrompt();
  // take the options
  console.log(options);
}
