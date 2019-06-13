import onIdle from "on-idle";

import { store, events } from "./model";

import Modal from "./components/Modal/Modal";
import Overlay from "./components/Modal/Overlay";

let isIdle;
function initializeCart() {
  isIdle(); // Remove Listener

  const { open: openModal, route } = store.get().modal;

  const cart = document.createElement("div");
  cart.classList.add("moltin-shopkit");

  const modal = Modal({ openModal });
  const modalOverlay = Overlay({ openModal });

  events.on("modal", ({ open: openModal }) => {
    modal.update({ openModal });
    modalOverlay.update({ openModal });
  });

  cart.appendChild(modal);
  cart.appendChild(modalOverlay);
  document.body.appendChild(cart);
}

window.onload = () => {
  isIdle = onIdle(() => initializeCart());
};
