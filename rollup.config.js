// import babel from "rollup-plugin-babel";
import sizes from "rollup-plugin-sizes";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";
import commonjs from "rollup-plugin-commonjs";
import minify from "rollup-plugin-babel-minify";
import resolve from "rollup-plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import multiEntry from "rollup-plugin-multi-entry";
// import minifyliterals from "rollup-plugin-minifyliterals";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";

const mode = process.env.NODE_ENV;
const production = !process.env.ROLLUP_WATCH;

export default {
  input: ["src/main.js", "src/cart.js"],

  output: {
    file: "dist/app.js",
    format: "iife",
    name: "app",
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

    /*
    babel({
      exclude: "node_modules/**",
      presets: [["@babel/preset-env"]],
      plugins: [],
      runtimeHelpers: true,
      babelrc: false
    }),
    */

    // minifyliterals(),

    !production && livereload("dist"),

    production && sizeSnapshot(),

    /*

    */

    // production && minify(),
    production &&
      terser({
        mangle: {
          reserved: ["initialize", "initializeCart"]
        }
      }),

    production &&
      sizes({
        details: true
      })
  ],
  watch: {
    clearScreen: false
  }
};
