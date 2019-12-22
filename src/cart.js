import onIdle from "on-idle";

import {connect} from "./model";
import {stripeKey} from "./helpers/api";

import "./components/Theme.svelte";
import Modal from "./components/Modal/Modal.svelte";

function initializeCart() {
  const cart = connect("cart");

  // Restore Cart Session
  cart.dispatch("getCart");

  const modal = document.createElement("div");
  modal.id = "moltin-shopkit";
  document.body.appendChild(modal);

  new Modal({
    target: document.getElementById("moltin-shopkit"),
    props: {
      stripeKey
    }
  });
}

window.onload = () => onIdle(() => initializeCart());
