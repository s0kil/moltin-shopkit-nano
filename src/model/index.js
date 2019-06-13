import mitt from "mitt";
import createStore from "storeon";
import persistState from "@storeon/localstorage";

import cart from "./cart.js";
import modal from "./modal.js";
import checkout from "./checkout.js";

export const events = mitt();
const eventEmitter = function() {
  return function(store) {
    store.on("@changed", function(state) {
      // TODO : Diff State Changes For Smaller Payload ?
      Object.keys(state).forEach(key => {
        events.emit(key, state[key]);
      });
    });
  };
};

export const store = createStore([
  cart,
  modal,
  checkout,

  eventEmitter(),
  persistState(["cart"], {
    key: "mcart"
  })
]);
