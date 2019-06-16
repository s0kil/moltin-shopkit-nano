import { h as html } from "stage0";

import { connect } from "../model";

import Button from "./UI/Button";

const cart = connect("cart");

function addItem(item) {
  item.moltinType !== "custom"
    ? cart.dispatch("addItem", { id: item.moltinProductId })
    : cart.dispatch("addItem", {
        type: "custom_item",
        name: item.moltinProductName,
        sku: item.moltinProductSku,
        price: {
          amount: parseInt(item.moltinProductPrice, 10)
        }
      });

  item.moltinOpenCart && cart.dispatch("goToCart");
}

const View = html`
  <span class="shopkit-buy-button"></span>
`;

export default function BuyButton(item) {
  const { moltinText, moltinType, moltinProductId } = item;
  const root = View.cloneNode(true);

  if (moltinType !== "custom" && !moltinProductId) {
    console.warn("No product ID provided to Moltin Btn.");
    return null;
  }

  root.appendChild(
    Button({
      text: moltinText || "Add to Cart",
      type: "primary"
    })
  );

  root.__click = () => addItem(item);

  return root;
}
