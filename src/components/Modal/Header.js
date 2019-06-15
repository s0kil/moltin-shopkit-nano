import { h as html } from "stage0";
import { styles } from "stage0/styles";

import { store } from "../../model";
import { addClass, getSVG } from "../../helpers/dom";

import Button from "../UI/Button";

const HeaderStyles = styles({
  base: {
    display: "flex",
    "align-items": "center",
    "justify-content": "space-between"
  }
});

const ButtonStyles = styles({
  button: {
    "background-color": "transparent",
    padding: "0.25rem"
  }
});

const NavStyles = styles({
  base: {
    fill: "currentColor",
    width: "12px",
    height: "12px"
  }
});

const View = html`
  <div class="${HeaderStyles.base}"></div>
`;

export default function Header({ route } = {}) {
  const { dirty, completed } = store.get().checkout;
  const root = View.cloneNode(true);

  const navButton = document.createElement("span");
  if (route === "shipping" || (route === "billing" && !completed)) {
    getSVG("assets/modal-back.svg").then(svg => {
      navButton.innerHTML = svg;
      addClass(navButton.firstChild, NavStyles.base);
    });
  } else {
    getSVG("assets/modal-close.svg").then(svg => {
      navButton.innerHTML = svg;
      addClass(navButton.firstChild, NavStyles.base);
    });
  }

  const button = Button({
    className: ButtonStyles.button
  });
  button.appendChild(navButton);

  // TODO : Remove Listener On Modal Close
  button.__click = () => store.dispatch("closeModal");

  root.append(button);

  return root;
}

export const RouteHeader = styles({
  base: {
    "text-align": "center",
    "margin-bottom": "1.5rem"
  }
});
