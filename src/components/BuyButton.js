import { h as html } from "stage0";
import { setupSyntheticEvent } from "stage0/syntheticEvents";

import Button from "./Button";

setupSyntheticEvent("click");

const View = html`
  <span class="shopkit-button"></span>
`;
View.appendChild(
  Button({
    type: "primary",
    // loading: true
  })
);

export default function BuyButton(item, scope) {
  // console.log(item, scope);

  const root = View.cloneNode(true);
  const refs = View.collect(root);

  // console.log(refs);

  root.__click = () => console.debug(item);

  return root;
}
