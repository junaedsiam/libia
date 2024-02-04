export type Template = "react" | "vue" | "svelte";

export type Options = {
  template: Template;
  isTypescript: boolean;
  entryFileName: string;
  outputFileName: string;
  injectCssInJs: boolean;
};
