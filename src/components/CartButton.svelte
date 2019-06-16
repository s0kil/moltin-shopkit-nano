<script>
  import { connect } from "../model";
  import { pluralize } from "../helpers/utils.js";

  import Button from "./Button.svelte";

  export let moltinText = "Cart";
  export let moltinShowTotal = false;

  const cart = connect("cart");
  const modal = connect("modal");

  $: subTotal = $cart.subTotal;
  $: count = $cart.count;

  $: buttonSuffix =
    subTotal || count
      ? ` (${moltinShowTotal ? subTotal : pluralize(count, "item")})`
      : null;
</script>

<Button
  className="shopkit-cart-button"
  buttonType="primary"
  on:click={() => modal.dispatch('openCart')}>
   {moltinText}
  {#if buttonSuffix}{buttonSuffix}{/if}
</Button>
