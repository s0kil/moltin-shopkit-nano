import {h as html} from "stage0";

import {connect, events} from "../model";
import {pluralize} from "../helpers/utils";

import Button from "./Button";

const View = html`
  <span class="shopkit-cart-button"></span>
`;

export default function CartButton(item) {
  const {moltinText, moltinShowTotal} = item;
  const cart = connect("cart");

  const root = View.cloneNode(true);

  function buttonSuffix(subTotal, count) {
    return subTotal || count
      ? ` (${moltinShowTotal ? subTotal : pluralize(count, "item")})`
      : null;
  }

  const buttonText = (subTotal, count) =>
    `${moltinText || "Cart"}${buttonSuffix(subTotal, count) || ""}`;

  const child = Button({
    text: buttonText(),
    type: "primary"
  });

  root.appendChild(child);

  root.update = ({count, subTotal}) =>
    child.update(buttonText(subTotal, count));

  events.on("cart", cart => root.update(cart));

  root.__click = () => cart.dispatch("openCart");

  return root;
}
