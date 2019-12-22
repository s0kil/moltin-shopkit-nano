import svelte from "rollup-plugin-svelte";
import replace from "@rollup/plugin-replace";
import {terser} from "rollup-plugin-terser";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import liveReload from "rollup-plugin-livereload";
import multiEntry from "@rollup/plugin-multi-entry";
import {sizeSnapshot} from "rollup-plugin-size-snapshot";
import minifyLiterals from "rollup-plugin-minify-html-literals";

const mode = process.env.NODE_ENV;
const production = !process.env.ROLLUP_WATCH;

export default {
  input: ["src/main.js", "src/cart.js"],
  output: {
    file: "dist/moltin-shopkit.js",
    format: "iife",
    sourcemap: !production
  },

  plugins: [
    multiEntry(),

    replace({
      "process.browser": true,
      "process.env.NODE_ENV": JSON.stringify(mode)
    }),

    resolve({
      browser: true,
      mainFields: ["module", "main", "jsnext:main"]
    }),

    commonjs(),

    svelte({
      dev: !production,
      css: css => {
        css.write("dist/moltin-shopkit.css", !production);
      }
    }),

    minifyLiterals({
      failOnError: true
    }),

    !production && liveReload("dist"),

    production && sizeSnapshot(),
    production &&
    terser({
      compress: {
        passes: 3,
        unsafe: true,
      },
      mangle: {
        reserved: ["initialize", "initializeCart"]
      }
    })
  ],
  watch: {
    clearScreen: false
  }
};
