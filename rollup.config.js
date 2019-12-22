import svelte from "rollup-plugin-svelte";
import replace from "@rollup/plugin-replace";
import {terser} from "rollup-plugin-terser";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import liveReload from "rollup-plugin-livereload";
import minifyLiterals from "rollup-plugin-minify-html-literals";

const mode = process.env.NODE_ENV;
const production = !process.env.ROLLUP_WATCH;

export default {
  // input: ["src/shopkit.js", "src/shopkit-cart.js"],
  input: "src/shopkit.js",
  output: {
    dir: "dist",
    // file: "dist/moltin-shopkit.js",
    format: "esm",
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

    svelte({
      dev: !production,
      css: css => {
        css.write("dist/shopkit.css", !production);
      }
    }),

    minifyLiterals({
      failOnError: true
    }),

    !production && liveReload("dist"),

    production &&
    terser({
      compress: {
        passes: 3,
        unsafe: true,
      },
      // mangle: {reserved: ["initialize", "initializeCart"]}
    })
  ],
  watch: {
    clearScreen: false
  }
};
