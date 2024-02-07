export type Framework = "react" | "vue" | "svelte";
// https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
export type Templates = Framework | `${Framework}-ts`;
export type PackageManagers = "pnpm" | "npm";

export type PromptOptions = {
  packageName: string;
  framework: Framework;
  isTypescript: boolean;
  entry: string;
  injectCssInJs: boolean;
  packageManager: PackageManagers;
};

export interface TaskCtx {
  options: PromptOptions;
  targetDir: string;
}
