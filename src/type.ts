export type Template = "react" | "vue" | "svelte";

export type PromptOptions = {
  template: Template;
  isTypescript: boolean;
  entryFileName: string;
  outputFileName: string;
  injectCssInJs: boolean;
};
