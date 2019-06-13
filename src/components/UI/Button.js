import { h as html } from "stage0";
import styles from "stage0/styles";

import { addClass } from "../../helpers/utils";
import theme from "../../theme";

const SpinnerStyle = styles({
  base: {
    display: "inline",
    "margin-right": "0.25rem"
  }
});

const Spinner = html`
  <img src="spinner.svg" class=${SpinnerStyle.base} alt="Loading" />
`;

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
  },
  noPadding: {
    padding: 0
  },
  disabled: {
    opacity: 0.5,
    ":hover": {
      cursor: "not-allowed"
    }
  },
  block: {
    width: "100%"
  },
  marginTop: {
    "margin-top": "1.5rem"
  },
  large: {
    height: "3.25rem"
  }
});

const View = html`
  <button class="${ButtonStyle.base}">#text</button>
`;

export default function Button(item = {}) {
  const {
    text,
    type,
    block,
    large,
    loading,
    disabled,
    marginTop,
    noPadding
  } = item;
  const root = View;
  const refs = View.collect(root);
  const buttonText = refs.text;

  root.update = text => (buttonText.nodeValue = text);
  root.update(text);

  if (noPadding) addClass(root, noPadding);
  if (type) addClass(root, ButtonStyle[type]);
  if (block) addClass(root, ButtonStyle.block);
  if (large) addClass(root, ButtonStyle.large);
  if (disabled) addClass(root, ButtonStyle.disabled);
  if (marginTop) addClass(root, ButtonStyle.marginTop);

  if (loading) return Spinner;
  else return root;
}
