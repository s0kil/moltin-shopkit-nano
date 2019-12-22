import fastDom from "fastdom";
import onBrowserIdle from "on-idle";
import whenDomReady from "when-dom-ready";
import {setupSyntheticEvent} from "stage0/syntheticEvents";
import fastDomPromised from "fastdom/extensions/fastdom-promised";
import speculative from "speculative";
import {inEach} from "./helpers/utils";
import {MoltinClient} from "./services/moltin";
import {fetchController, setApiHandler} from "./helpers/api";

import BuyButton from "./components/BuyButton";
import CartButton from "./components/CartButton";

const FastDom = fastDom.extend(fastDomPromised);

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
      ...(moltinCurrency && {moltinCurrency})
    });
    setApiHandler({
      client: moltinClient,
      stripeKey: moltinStripePublishableKey
    });
  });

  let buyButtons;
  FastDom.measure(() => {
    buyButtons = [...document.getElementsByClassName("moltin-buy-button")];
  }).then(() => {
    inEach(buyButtons, buyButton => {
      FastDom.mutate(() =>
        buyButton.appendChild(BuyButton({...buyButton.dataset}))
      );
    });
  });

  let cartButtons;
  FastDom.measure(() => {
    cartButtons = [...document.getElementsByClassName("moltin-cart-button")];
  }).then(() => {
    inEach(cartButtons, cartButton => {
      FastDom.mutate(() =>
        cartButton.appendChild(CartButton({...cartButton.dataset}))
      );
    });
  });

  setupSyntheticEvent("click");

  const moltinAPIURL = "https://api.moltin.com";
  speculative({
    rel: "dns-prefetch",
    href: moltinAPIURL
  });
  speculative({
    rel: "preconnect",
    crossorigin: "anonymous",
    href: moltinAPIURL
  });

  onBrowserIdle(() => {
    import("./shopkit-cart").then(({initializeCart}) => {
      initializeCart();
    });
  });
}

whenDomReady().then(() => initialize(document));
