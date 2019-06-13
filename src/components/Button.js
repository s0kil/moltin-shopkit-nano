import { h as html } from "stage0";
import styles from "stage0/styles";

import theme from "../theme";

const SpinnerStyle = styles({
  base: {
    display: "inline",
    "margin-right": "0.25rem"
  }
});

const Spinner = html`<img src="spinner.svg" class=${SpinnerStyle.base} alt="Loading" />`;

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
    },

    block: {
      width: "100%"
    },

    marginTop: {
      "margin-top": "1.5rem"
    }
  },

  primary: {
    "background-color": theme.primary,
    "border-color": theme.white,
    color: theme.white,
    height: "2.8rem",
    display: "inline-flex",
    "align-items": "center",
    "justify-content": "center",

    large: {
      height: "3.25rem"
    }
  },

  text: {
    color: theme.dark,
    "font-weight": 500,
    "font-size": `${theme.textSmall} !important`,
    "text-decoration": "underline",
    padding: 0,

    ":hover": {
      color: theme.primary
    }
  }
});

const ButtonView = html`
  <button class="${ButtonStyle.base}">Buy Button</button>
`;

export default function Button(item = {}) {
  const root = ButtonView;
  const { type, block, marginTop, large, loading } = item;

  if (block) root.classList.add(ButtonStyle.base.block);
  if (marginTop) root.classList.add(ButtonStyle.base.marginTop);
  if (large) root.classList.add(ButtonStyle.primary.large);
  if (type) root.classList.add(ButtonStyle[type]);

  if (loading) {
    return Spinner;
  } else {
    return root;
  }
}
