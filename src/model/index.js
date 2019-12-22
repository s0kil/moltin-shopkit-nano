import mitt from "mitt";
import persistState from "@storeon/localstorage";
import {createSvelteStore} from "@storeon/svelte";

import {inEach} from "../helpers/utils";

import cart from "./cart.js";
import modal from "./modal.js";
import checkout from "./checkout.js";

export const events = mitt();
const eventEmitter = function () {
  return function (store) {
    store.on("@changed", function (state) {
      inEach(Object.keys(state), key => events.emit(key, state[key]));
    });
  };
};

export const connect = createSvelteStore([
  cart,
  modal,
  checkout,

  eventEmitter(),
  persistState(["cart"], {
    key: "mcart"
  })
]);
