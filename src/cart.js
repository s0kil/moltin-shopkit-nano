import onIdle from "on-idle";

import Modal from "./components/Modal";

let isIdle;
function initializeCart() {
  isIdle(); // Remove Listener
  const root = Modal();

  const cart = document.createElement("div");
  cart.appendChild(root);
  document.body.appendChild(cart);
}

window.onload = () => {
  isIdle = onIdle(() => initializeCart());
};
