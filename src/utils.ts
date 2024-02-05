export const getDefaultEntry = (isTypescript: boolean) =>
  `index.${isTypescript ? "ts" : "js"}`;
