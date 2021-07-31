import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import url from "@rollup/plugin-url";
import commonjs from "@rollup/plugin-commonjs";
import metablock from "rollup-plugin-userscript-metablock";

let terserConfig = {
  format: {
    comments: false,
    semicolons: false,
  },
};

const pkg = require("./package.json");

export default [
  {
    input: "src/client/index.ts",
    output: {
      file: "dist/client.user.js",
      format: "esm",
    },
    plugins: [
      url({
        include: ["**/*.css"],
      }),
      commonjs(),
      typescript({ lib: ["dom"] }),
      terser(terserConfig),
      metablock({
        override: {
          name: pkg.name,
          namespace: "https://github.com/swz-gh/yare-sync",
          version: pkg.version,
          description: pkg.description,
          author: pkg.author,
          icon: "https://yare.io/favicon.ico",
          match: "https://yare.io/d*/*",
          "run-at": "document-start",
          grant: "none",
        },
      }),
    ],
  },
  {
    input: "src/server/index.ts",
    output: {
      file: "dist/server.js",
      format: "cjs",
    },
    plugins: [typescript(), terser(terserConfig)],
  },
];
