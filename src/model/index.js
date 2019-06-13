import mitt from "mitt";
import createStore from "storeon";
import persistState from "@storeon/localstorage";

import { inEach } from "../helpers/utils";

import cart from "./cart.js";
import modal from "./modal.js";
import checkout from "./checkout.js";

// Special Thanks To: https://stackoverflow.com/a/37396358
let oldState = {};
function diffObject(object1, object2) {
  return Object.keys(object2).reduce((diff, key) => {
    if (Object.is(object1[key], object2[key])) return diff;
    return {
      ...diff,
      [key]: object2[key]
    };
  }, null);
}

export const events = mitt();
const eventEmitter = function() {
  return function(store) {
    store.on("@changed", function(state) {
      // Diff State Changes, Removing Redundant Events
      inEach(Object.keys(state), key => {
        if (!oldState[key]) {
          events.emit(key, state[key]);
          oldState[key] = state[key];
        } else {
          const diffStateChanges = diffObject(oldState[key], state[key]);
          if (diffStateChanges) events.emit(key, diffStateChanges);
          oldState[key] = state[key];
        }
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
