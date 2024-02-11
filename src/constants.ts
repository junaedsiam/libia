import { Framework, PackageManagers, Templates } from "./type.js";

export const frameworks: { name: string; value: Framework }[] = [
  {
    name: "Vanilla",
    value: "vanilla",
  },
  {
    name: "React",
    value: "react",
  },
  {
    name: "Vue",
    value: "vue",
  },
  {
    name: "Svelte",
    value: "svelte",
  },
];

export const packageManagers: { name: string; value: PackageManagers }[] = [
  {
    name: "pnpm (recommended)",
    value: "pnpm",
  },
  {
    name: "npm",
    value: "npm",
  },
];
