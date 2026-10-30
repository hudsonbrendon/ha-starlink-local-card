import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/starlink-local-card.ts",
  output: {
    file: "dist/ha-starlink-local-card.js",
    format: "es",
    sourcemap: true,
    inlineDynamicImports: true,
  },
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    json(),
    typescript({ tsconfig: "./tsconfig.json", declaration: false, sourceMap: true }),
    terser({ format: { comments: false } }),
  ],
};
