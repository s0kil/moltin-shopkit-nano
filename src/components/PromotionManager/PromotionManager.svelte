<script>
  import Form from "./Form.svelte";
  import Promotion from "./Promotion.svelte";

  export let promotionItems, addPromotion, removePromotion, error;

  const hasPromotion = promotionItems.length > 0;
  const [promotion] = promotionItems;
</script>

<style>
  div {
    margin: 0;
    padding: 0.75rem 0 1.5rem;
    border-top: 1px solid var(--divider);
  }
</style>

<div>
  {#if hasPromotion}
    <Promotion {removePromotion} {...promotion} />
  {:else}
    <Form {addPromotion} {error} />
  {/if}
</div>
