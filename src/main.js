import fastdom from "fastdom";
import whenDomReady from "when-dom-ready";
import { setupSyntheticEvent } from "stage0/syntheticEvents";
import fastdomPromised from "fastdom/extensions/fastdom-promised";

import { inEach } from "./helpers/utils";
import { MoltinClient } from "./services/moltin";
import { setApiHandler, fetchController } from "./helpers/api";

import BuyButton from "./components/BuyButton";
import CartButton from "./components/CartButton";

const FastDom = fastdom.extend(fastdomPromised);

function initialize(document) {
  let script,
    moltinClient,
    moltinClientId,
    moltinStripePublishableKey,
    moltinCurrency;

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

    moltinClient = new MoltinClient({
      fetch: fetchController,
      client_id: moltinClientId,
      application: "moltin-btn",
      ...(moltinCurrency && { moltinCurrency })
    });
    setApiHandler(moltinClient);
  });

  let buyButtons;
  FastDom.measure(() => {
    buyButtons = [...document.getElementsByClassName("moltin-buy-button")];
  }).then(() => {
    inEach(buyButtons, buyButton => {
      FastDom.mutate(() =>
        buyButton.appendChild(BuyButton({ ...buyButton.dataset }))
      );
    });
  });

  let cartButtons;
  FastDom.measure(() => {
    cartButtons = [...document.getElementsByClassName("moltin-cart-button")];
  }).then(() => {
    inEach(cartButtons, cartButton => {
      FastDom.mutate(() =>
        cartButton.appendChild(
          CartButton({ loading: true, ...cartButton.dataset })
        )
      );
    });
  });

  setupSyntheticEvent("click");
}

whenDomReady().then(() => initialize(document));
