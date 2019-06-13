import { h as html } from "stage0";

import { store, events } from "../model";
import { pluralize } from "../helpers/utils";

import Button from "./UI/Button";

const View = html`
  <span class="shopkit-cart-button"></span>
`;

export default function CartButton(item) {
  const { moltinText, moltinShowTotal } = item;
  let { count, subTotal } = store.get().cart;
  const root = View;

  function buttonSuffix() {
    return subTotal || count
      ? ` (${moltinShowTotal ? subTotal : pluralize(count, "item")})`
      : null;
  }

  const buttonText = () => `${moltinText || "Cart"}${buttonSuffix() || ""}`;

  const child = Button({
    text: buttonText(),
    type: "primary"
  });

  root.appendChild(child);

  root.update = cart => {
    ({ count, subTotal } = cart);
    child.update(buttonText());
  };

  events.on("cart", cart => root.update(cart));

  root.__click = () => store.dispatch("getCart");

  return root;
}
