import babel from "rollup-plugin-babel";
import sizes from "rollup-plugin-sizes";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import minifyliterals from "rollup-plugin-minifyliterals";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";

const mode = process.env.NODE_ENV;
const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/main.js",

  output: {
    file: "dist/app.js",
    format: "iife",
    name: "app",
    sourcemap: !production
  },

  plugins: [
    replace({
      "process.browser": true,
      "process.env.NODE_ENV": JSON.stringify(mode)
    }),

    resolve({
      browser: true,
      mainFields: ["module", "main", "jsnext:main"]
    }),

    commonjs(),

    // minifyliterals(),

    babel({
      exclude: "node_modules/**",
      presets: [["@babel/preset-env"]],
      // plugins: [["@babel/plugin-transform-runtime"]],
      runtimeHelpers: true,
      babelrc: false
    }),

    !production && livereload("dist"),

    production && sizeSnapshot(),

    production && terser(),

    production &&
    sizes({
      details: true
    })
  ],
  watch: {
    clearScreen: false
  }
};
