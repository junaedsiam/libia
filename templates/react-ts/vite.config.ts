import { UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import pkg from "./package.json";
import tsconfigPaths from "vite-tsconfig-paths";
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
      react(),
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
        external: ["react", "react-dom"],
      },
    },
  };

  return config;
};

export default generateConfig({});
