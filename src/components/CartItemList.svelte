<script>
  import { connect } from "../model";

  import CartItem from "./CartItem.svelte";
  import PromotionManager from "./PromotionManager/PromotionManager.svelte";

  export let items, promotionItems;

  const cart = connect("cart");

  function removeItem(itemId) {
    items = items.filter(item => item.id !== itemId);

    cart.dispatch("removeItem", itemId);
  }

  function updateItem(item) {
    cart.dispatch("updateItem", item);
  }

  function addPromotion(promotionCode) {
    cart.dispatch("addPromotion", promotionCode);
  }
</script>

<style>
  .wrapper {
    padding-bottom: 0.75rem;
  }
</style>

<div class="wrapper">
  {#each items as item (item.id)}
    <CartItem
      key={item.id}
      removeFromCart={removeItem}
      {updateItem}
      averageApiRequest={$cart.averageApiRequest}
      {...item} />
  {/each}
</div>

<PromotionManager
  error={$cart.error}
  {addPromotion}
  {promotionItems}
  removePromotion={removeItem} />
