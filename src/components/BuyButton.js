import { h as html } from "stage0";

import { store } from "../model";

import Button from "./UI/Button";

function addItem(item) {
  item.moltinType !== "custom"
    ? store.dispatch("addItem", { id: item.moltinProductId })
    : store.dispatch("addItem", {
        type: "custom_item",
        name: item.moltinProductName,
        sku: item.moltinProductSku,
        price: {
          amount: parseInt(item.moltinProductPrice, 10)
        }
      });

  item.moltinOpenCart && store.dispatch("goToCart");
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
