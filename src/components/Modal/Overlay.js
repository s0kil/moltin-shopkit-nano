import { h as html } from "stage0";
import { styles } from "stage0/styles";

import { store } from "../../model";

import { addClass, removeClass } from "../../helpers/dom";

const Styles = styles({
  base: {
    transition: "all 0.3s ease",
    "background-color": "#333",
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    "z-index": 1000000000
  },

  hidden: {
    opacity: 0,
    visibility: "hidden",
    "overflow-x": 0,
    "will-change": "opacity"
  },

  visible: {
    opacity: 0.3,
    visibility: "visible",
    "overflow-x": 100
  }
});

const View = html`
  <div class="shopkit-modal-overlay ${Styles.base} ${Styles.hidden}"></div>
`;

export default function Overlay(item = {}) {
  const { openModal } = item;
  const root = View;

  function showOverlay(openModal) {
    if (openModal) addClass(root, Styles.visible);
    else removeClass(root, Styles.visible);
  }
  showOverlay(openModal);

  root.update = ({ openModal }) => {
    showOverlay(openModal);
  };

  root.__click = () => store.dispatch("closeModal");

  return root;
}
