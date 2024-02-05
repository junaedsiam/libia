export type Framework = "react" | "vue" | "svelte";
// https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
export type Templates = Framework | `${Framework}-ts`;
export type PromptOptions = {
  framework: Framework;
  isTypescript: boolean;
  entryFileName: string;
  outputFileName: string;
  injectCssInJs: boolean;
};
