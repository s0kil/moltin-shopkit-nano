import onIdle from "on-idle";

import { store, events } from "./model";
import { addClass } from "./helpers/dom";

import Modal from "./components/Modal/Modal";
import Overlay from "./components/Modal/Overlay";

function initializeCart() {
  // Send OAuth Request
  store.dispatch("getCart");

  let { open: openModal, route } = store.get().modal;

  const cart = document.createElement("div");
  addClass(cart, "moltin-shopkit");

  const modal = Modal({ openModal });
  const modalOverlay = Overlay({ openModal });

  events.on("modal", () => {
    ({ open: openModal, route } = store.get().modal);

    modal.update({ openModal, route });
    modalOverlay.update({ openModal });
  });

  cart.appendChild(modal);
  cart.appendChild(modalOverlay);
  document.body.appendChild(cart);
}

window.onload = () => {
  onIdle(() => {
    initializeCart();
  });
};
