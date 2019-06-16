<script>
  import { connect } from "../model";
  import { pluralize } from "../helpers/utils.js";

  import Button from "./Button.svelte";
  import CartItemList from "./CartItemList.svelte";
  import Heading from "./Typography/Heading.svelte";
  import RouteHeader from "./Modal/RouteHeader.svelte";

  const cart = connect("cart");
  const modal = connect("modal");

  $: count = $cart.count;
  $: items = $cart.items;
  $: isEmpty = $cart.isEmpty;
  $: subTotal = $cart.subTotal;
  $: promotionItems = $cart.promotionItems;
</script>

<style>
  .cart-empty {
    color: var(--dark);
    text-align: center;
    margin: 1.5rem 0;
  }

  .cart-total-row {
    border-top: 1px solid var(--divider);
    padding: 1.5rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .cart-total-title {
    color: var(--dark);
    font-weight: 500;
    font-size: var(--textLarge);
  }

  .cart-total-sub-total {
    color: var(--dark);
    font-weight: 500;
    font-size: var(--textExtraLarge);
  }
</style>

<div class="moltin-shopkit shopkit-cart">
  <RouteHeader>
    <Heading>Your shopping cart</Heading>
  </RouteHeader>

  {#if isEmpty}
    <div class="cart-empty">Your cart is empty</div>
  {:else}
    <CartItemList {isEmpty} {items} {promotionItems} />

    <div class="cart-total-row">
      <span class="cart-total-title">Total</span>
      <span class="cart-total-sub-total">{subTotal}</span>
    </div>

    <Button
      buttonType="Primary"
      buttonSize="large"
      on:click={() => {
        modal.dispatch('goToShipping');
      }}>
      Checkout with {pluralize(count, 'item')}
    </Button>
  {/if}
</div>
