<script>
  import { onMount } from "svelte";

  import { connect } from "../model";

  import Button from "./Button.svelte";

  export let moltinText = "Add to Cart";
  export let moltinType = null;
  export let moltinOpenCart = false;
  export let moltinProductId = null;
  export let moltinProductSku = null;
  export let moltinProductName = null;
  export let moltinProductPrice = null;

  const cart = connect("cart");
  const modal = connect("modal");

  function addItem() {
    moltinType !== "custom"
      ? cart.dispatch("addItem", { id: moltinProductId })
      : cart.dispatch("addItem", {
          type: "custom_item",
          name: moltinProductName,
          sku: moltinProductSku,
          price: {
            amount: parseInt(moltinProductPrice, 10)
          }
        });

    moltinOpenCart && modal.dispatch("openCart");
  }

  onMount(() => {
    if (moltinType !== "custom" && !moltinProductId) {
      console.warn("No product ID provided to Moltin Btn.");
      return null;
    }
  });
</script>

<Button buttonType="primary" className="shopkit-buy-button" on:click={addItem}>
   {moltinText}
</Button>
