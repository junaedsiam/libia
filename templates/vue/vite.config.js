import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import pkg from "./package.json";
import config from './config.json'

const generateConfig = ({
  entry = "src/index.js",
  injectCssInJs = false,
  outputFileName = null,
}) => {
  const config = {
    plugins: [
      vue(),
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
        external: ["vue"],
      },
    },
  };

  return config;
};
/** @type {import('vite').UserConfig} */
export default generateConfig(config);
