import { InvalidArgError } from "./error";
import { initiatePrompt } from "./prompt";
import { Options } from "./type";
const INIT = "init";

function parseArguments(args: string[]) {
  if (!args[0] || args[0] !== INIT || !args[1]) {
    throw new InvalidArgError();
  }

  return args;
}

function getTemplateName(options: Options) {
  const { template, isTypescript } = options;
  return template + (isTypescript ? "-ts" : "");
}

function provideTemplateBasedOnOptions(options: Options) {
  // Todo: Extract template name from template + isTypescript
  const templateName = getTemplateName(options);
  console.log(templateName);
}

export async function cli(rawArgs: string[]): Promise<void> {
  const args = parseArguments(rawArgs.slice(2));

  const options: Options = await initiatePrompt();
  // take the options
  console.log(options);

  await provideTemplateBasedOnOptions(options);
}
// Extract information about template from template + isTypescript
// entryFileName + outputFileName + injectCssInJs -> put it in vite config
