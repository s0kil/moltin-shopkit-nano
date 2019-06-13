import fastdom from "fastdom";
import fastdomPromised from "fastdom/extensions/fastdom-promised";

import BuyButton from "./components/BuyButton";
import CartButton from "./components/CartButton";

const FastDom = fastdom.extend(fastdomPromised);

function initialize(document) {
  let script, moltinClientId, moltinStripePublishableKey, moltinCurrency;

  FastDom.measure(() => {
    script = document.querySelector("script[data-moltin-client-id]");
  }).then(() => {
    if (!script) {
      console.error(
        "You must provide a Moltin Client ID to enable the Moltin Btn"
      );
      return;
    }

    ({
      moltinClientId,
      moltinStripePublishableKey,
      moltinCurrency
    } = script.dataset);

    if (!moltinStripePublishableKey) {
      console.error(
        "You must provide your Stripe Publishable Key to enable the Moltin Btn"
      );
      return;
    }
  });

  let buyButtons;
  FastDom.measure(() => {
    buyButtons = [...document.getElementsByClassName("moltin-buy-button")];
  }).then(() => {
    let buyButtonsLength = buyButtons.length;
    while (buyButtonsLength--) {
      let buyButton = buyButtons[buyButtonsLength];
      FastDom.mutate(() =>
        buyButton.appendChild(BuyButton({ ...buyButton.dataset }))
      );
    }
  });

  let cartButtons;
  FastDom.measure(() => {
    cartButtons = [...document.getElementsByClassName("moltin-cart-button")];
  }).then(() => {
    let cartButtonsLength = cartButtons.length;
    while (cartButtonsLength--) {
      let cartButton = cartButtons[cartButtonsLength];
      FastDom.mutate(() =>
        cartButton.appendChild(CartButton({ ...cartButton.dataset }))
      );
    }
  });
}

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    initialize(document);
  }
};
