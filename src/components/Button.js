import {h as html} from "stage0";
import {styles} from "stage0/styles";

import {addClass} from "../helpers/dom";
import theme from "./Theme";

const ButtonStyle = styles({
  base: {
    background: "none",
    "box-sizing": "border-box",
    "line-height": "1.15",
    "-webkit-text-size-adjust": "100%",
    margin: 0,
    "font-family":
      "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif",
    "font-size": "15px",
    appearance: "none",
    "border-radius": "0.25rem",
    border: "1px solid transparent",
    "font-weight": 500,
    outline: "none",
    padding: "0 1rem",
    opacity: 1,
    color: theme.placeholder,
    "::before, ::after": {
      "box-sizing": "inherit",
      "-webkit-font-smoothing": "antialiased"
    },
    ":hover, :focus": {
      outline: "none"
    },
    ":hover": {
      cursor: "pointer"
    }
  },
  primary: {
    "background-color": theme.primary,
    "border-color": theme.white,
    color: theme.white,
    height: "2.8rem",
    display: "inline-flex",
    "align-items": "center",
    "justify-content": "center"
  }
});

const View = html`
  <button class="${ButtonStyle.base}">#text</button>
`;

export default function Button(item = {}) {
  const {text, type} = item;
  const root = View.cloneNode(true);
  const refs = View.collect(root);
  const buttonText = refs.text;

  if (type) addClass(root, ButtonStyle[type]);

  root.update = text => (buttonText.nodeValue = text);
  root.update(text);

  return root;
}
