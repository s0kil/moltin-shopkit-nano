import { h as html } from "stage0";
import styles from "stage0/styles";

import { addClass } from "../../helpers/utils";

import Header from "./Header";
import Footer from "./Footer";
import OrderList from "../OrderList";
import Cart from "../Cart";
import Checkout from "../Checkout";

const ModalStyle = styles({
  base: {
    transition: "all 0.3s ease",
    "background-color": "#fff",
    position: "fixed",
    top: 0,
    bottom: 0,
    right: 0,
    "overflow-y": scroll,
    height: "100%",
    "box-shadow": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "z-index": 1000000001,
    padding: "1.5rem",
    width: "100%",
    "border-width": 0,
    "max-width": "500px",
    display: "flex",
    "flex-direction": "column",
    "justify-content": "space-between",
    "box-sizing": "border-box",
    "line-height": 1.15,
    "-webkit-text-size-adjust": "100%",
    margin: 0,
    "font-family":
      "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif",
    "font-size": "15px",

    "*, *::before, *::after": {
      "box-sizing": "inherit",
      "-webkit-font-smoothing": "antialiased"
    }
  },

  hidden: {
    opacity: 0,
    visibility: "hidden",
    transform: "translateX(0)"
  },

  visible: {
    opacity: 1,
    visibility: "visible",
    transform: "translateX(525px)"
  }
});

const ModalOverlayStyles = styles({
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
    "overflow-x": 0
  },

  visible: {
    opacity: 1,
    visibility: "visible",
    "overflow-x": 100
  }
});

const ModalOverlay = html`
  <div class="shopkit-modal-overlay ${ModalOverlayStyles.hidden}"></div>
`;

const View = html`
  <div class="shopkit-modal"></div>
`;

export default function Modal(item = {}) {
  const { open } = item;
  const root = View;
  const child = ModalOverlay;
  root.appendChild(child);

  addClass(root, ModalStyle.base);

  if (!open) addClass(root, ModalStyle.hidden);

  return root;
}
