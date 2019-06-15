import { h as html } from "stage0";
import styles from "stage0/styles";

import theme from "../theme";
import { addClass, getSVG } from "../helpers/dom";

const WrapperStyles = styles({
  base: {
    "align-items": "center",
    display: "flex"
  }
});

const Wrapper = html`
  <div class="${WrapperStyles.base}"></div>
`;

const LinkStyles = styles({
  base: {
    cursor: "pointer",
    display: "inline-flex",
    "align-items": "center",
    "font-family": "inherit",
    "font-size": "100%",
    "text-decoration": "none",
    margin: "0 auto",
    transition: "opacity 0.1s ease-in"
  }
});

const Link = html`
  <a class="${LinkStyles.base}"></a>
`;

const TextStyles = styles({
  base: {
    "margin-right": "0.5rem",
    color: theme.placeholder,
    "font-size": theme.textSmall
  }
});

const Text = html`
  <span class="${TextStyles.base}">Powered by</span>
`;

const LogoStyles = styles({
  base: {
    height: "2rem"
  }
});

export default function PoweredBy() {
  const root = Wrapper;

  const link = Link;
  link.target = "_blank";
  link.href = "https://www.moltin.com/commerce-solutions/embeddable-cart";

  getSVG("assets/logo.svg").then(logo => {
    link.innerHTML += logo;
    addClass(link.lastChild, LogoStyles.base);
  });

  const text = Text;
  link.appendChild(text);

  root.appendChild(link);
  return root;
}
