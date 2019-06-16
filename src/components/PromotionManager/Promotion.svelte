<script>
  import Label from "../Label.svelte";
  import Button from "../Button.svelte";

  export let id, sku, removePromotion;
</script>

<style>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .sku {
    color: var(--dark);
  }
</style>

<div>
  <Label>Gift card or discount code</Label>

  <div class="wrapper">
    <span class="sku">{sku}</span>

    <Button
      buttonType="primary"
      on:click={() => {
        removePromotion;
      }}>
      Remove
    </Button>
  </div>

</div>
