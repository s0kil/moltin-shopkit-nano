import { h as html } from "stage0";
import { styles } from "stage0/styles";

import { store } from "../../model";

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

const View = html`
  <div class="${HeaderStyles.base}">Header</div>
`;

export default function Header({ route } = {}) {
  const { dirty, completed } = store.get().checkout;
  const root = View.cloneNode(true);

  const button = Button({
    className: ButtonStyles.button
  });

  // TODO : Remove Listener On Modal Close
  button.__click = () => store.dispatch("closeModal");

  root.append(button);

  return root;
}
