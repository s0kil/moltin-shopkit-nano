// import babel from "rollup-plugin-babel";
import svelte from "rollup-plugin-svelte";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import multiEntry from "rollup-plugin-multi-entry";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import minifyLiterals from "rollup-plugin-minify-html-literals";

const mode = process.env.NODE_ENV;
const production = !process.env.ROLLUP_WATCH;

export default {
  input: ["src/main.js", "src/cart.js"],
  output: {
    file: "dist/app.js",
    format: "iife",
    name: "MoltinShopkitFemto",
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
        css.write("dist/bundle.css", !production);
      }
    }),

    minifyLiterals({
      failOnError: true
    }),

    /*
      babel({
        exclude: "node_modules/**",
        presets: [["@babel/preset-env"]],
        plugins: [],
        runtimeHelpers: true,
        babelrc: false
      }),
      */

    !production && livereload("dist"),

    production && sizeSnapshot(),
    production &&
      terser({
        mangle: {
          reserved: ["initialize", "initializeCart"]
        }
      })
  ],
  watch: {
    clearScreen: false
  }
};
