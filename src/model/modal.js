import loadAsset from "loadjs";

export default modal => {
  modal.on("@init", () => ({
    modal: {
      route: "cart",
      open: false
    }
  }));

  modal.on("@changed", ({modal}) => {
    modal.checkingOut = ["shipping", "billing"].includes(modal.route);
  });

  modal.on("changeRoute", ({modal}, route) => {
    return {
      modal: {
        route: route,
        open: true
      }
    };
  });

  modal.on("goToCart", () => modal.dispatch("changeRoute", "cart"));
  modal.on("goToShipping", () => modal.dispatch("changeRoute", "shipping"));
  modal.on("goToBilling", () => modal.dispatch("changeRoute", "billing"));
  modal.on("goToOrders", () => modal.dispatch("changeRoute", "orders"));
  modal.on("goToLogin", () => modal.dispatch("changeRoute", "login"));
  modal.on("goToConfirmation", () =>
    modal.dispatch("changeRoute", "confirmation")
  );

  modal.on("toggle", ({modal}) => (modal.open = !modal.open));

  modal.on("openCart", ({modal}) => {
    return {
      modal: {
        open: true,
        route: "cart"
      }
    };
  });

  modal.on("closeModal", state => {
    const {checkingOut} = state.modal;
    const {completed} = state.checkout;

    if (!completed && checkingOut) return;

    modal.dispatch("close");
  });

  modal.on("close", ({modal}) => {
    return {
      modal: {
        open: false
      }
    };
  });

  modal.on("continueShopping", ({modal}) => {
    return {
      modal: {
        open: false,
        route: "cart"
      }
    };
  });

  modal.on("loadStripe", ({modal}, stripeKey) => {
    if (!loadAsset.isDefined("stripe")) {
      loadAsset(["https://js.stripe.com/v3"], "stripe", {
        numRetries: 3
      });

      loadAsset.ready("stripe", {
        success: () => {
          Stripe(stripeKey);
        },
        error: () => {
          console.error("Stripe Failed To Load");
          return null;
        }
      });
    }
  });
};
