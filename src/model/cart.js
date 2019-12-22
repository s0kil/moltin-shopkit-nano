import {createCartIdentifier} from "../services/moltin";

import {moltinApi} from "../helpers/api.js";
import {timeResource} from "../helpers/resourcePerformance.js";

export default cart => {
  cart.on("@init", () => ({
    cart: {
      id: createCartIdentifier(),
      meta: null,
      items: []
    }
  }));

  cart.on("@dispatch", (state, [event, data]) => {
  });

  cart.on("@changed", ({cart}) => {
    cart.loading = false;

    cart.isEmpty = cart.items.length === 0;

    cart.count = cart.items.reduce((sum, {quantity}) => sum + quantity, 0);

    cart.subTotal = cart.meta
      ? cart.meta.display_price.without_tax.formatted
      : 0;

    cart.items = cart.items.filter(
      ({type}) => type === "cart_item" || type === "custom_item"
    );

    cart.promotionItems = cart.items.filter(
      ({type}) => type === "promotion_item"
    );

    cart.taxItems = cart.items.filter(({type}) => type === "tax_item");

    cart.averageApiRequest = (() => {
      const apiTime = timeResource("https://api.moltin.com");
      if (apiTime) return apiTime;
      else return cart.averageApiRequest;
    })();
  });

  cart.on("setId", ({cart}, cartId) => (cart.id = cartId));

  cart.on("setCart", ({cart}, {data, meta}) => {
    return {
      cart: {
        ...cart,
        items: data,
        meta: meta
      }
    };
  });

  cart.on("getCart", async state => {
    const payload = await moltinApi.get(`carts/${state.cart.id}/items`);
    cart.dispatch("setCart", payload);
  });

  cart.on("deleteCart", async state => {
    await moltinApi.delete(`carts/${state.cart.id}`);
    cart.dispatch("setCart", {
      data: [],
      meta: null,
      error: null
    });
  });

  cart.on(
    "addItem",
    async (state, {quantity = 1, type = "cart_item", ...item}) => {
      const payload = await moltinApi.post(`carts/${state.cart.id}/items`, {
        type,
        quantity,
        ...item
      });
      cart.dispatch("setCart", payload);
    }
  );

  cart.on("updateItem", async (state, item) => {
    const {id: itemId, quantity} = item;
    const {id: cartId} = state.cart;
    try {
      // moltinApi.debounce = true;
      const payload = await moltinApi.put(`carts/${cartId}/items/${itemId}`, {
        type: "cart_item",
        itemId,
        quantity
      });
      // moltinApi.debounce = false;

      cart.dispatch("setCart", payload);
    } catch (error) {
      console.log(error);
    }
  });

  cart.on("removeItem", async (state, itemId) => {
    const {id: cartId} = state.cart;
    const payload = await moltinApi.delete(`carts/${cartId}/items/${itemId}`);
    cart.dispatch("setCart", payload);
  });

  cart.on("addPromotion", async (state, promotionCode) => {
    const {id: cartId} = state.cart;

    try {
      const payload = await moltinApi.post(`carts/${cartId}/items`, {
        type: "promotion_item",
        promotionCode
      });

      cart.dispatch("setCart", payload);
    } catch ({statusCode}) {
      console.log("Code expired or invalid");
    } finally {
      return {
        state: {
          cart: {
            error: "error"
          }
        }
      };
    }
  });
};
