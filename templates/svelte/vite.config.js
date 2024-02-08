import { svelte } from '@sveltejs/vite-plugin-svelte'
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import jsconfigPaths from 'vite-jsconfig-paths'
import pkg from "./package.json";
import config from './config.json'
// https://vitejs.dev/config/

const generateConfig = ({
  entry = "src/index.js",
  injectCssInJs = false,
  outputFileName = null,
}) => {
  const config = {
    plugins: [
      svelte(),
      jsconfigPaths(),
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
/** @type {import('vite').UserConfig} */
export default generateConfig(config);
