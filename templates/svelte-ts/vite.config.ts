import { svelte } from "@sveltejs/vite-plugin-svelte";
import { UserConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import pkg from "./package.json";
import tsconfigPaths from "vite-tsconfig-paths";
import config from "./config.json";

// https://vitejs.dev/config/
const generateConfig = ({
  entry = "src/index.ts",
  injectCssInJs = false,
  outputFileName,
}: {
  entry?: string;
  injectCssInJs?: boolean;
  outputFileName?: string;
}) => {
  const config: UserConfig = {
    plugins: [
      tsconfigPaths(),
      svelte(),
      ...[injectCssInJs ? cssInjectedByJsPlugin() : undefined],
    ].filter(Boolean),
    build: {
      minify: true,
      lib: {
        name: pkg.name,
        entry,
        ...(outputFileName ? { fileName: outputFileName } : null),
      },
      rollupOptions: {
        external: ["svelte"],
      },
    },
  };

  return config;
};

export default generateConfig(config);
