<script>
  import Button from "./Button.svelte";

  export let itemId, quantity, updateItem;

  const increase = () => updateItem({ id: itemId, quantity: quantity + 1 });
  const decrease = () => updateItem({ id: itemId, quantity: quantity - 1 });
</script>

<style>
  .wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
  }

  .quantity {
    color: var(--dark);
    font-weight: 500;
    padding: 0.25rem 0;
  }

  svg {
    stroke: currentColor;
    width: 10px;
    height: 10px;
  }
</style>

<div class="wrapper">
  <Button noPadding={true} on:click={increase}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="6"
      viewBox="0 0 10 6">
      <polyline
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.25"
        points="0 4 4 0 8 4"
        transform="translate(1 1)" />
    </svg>
  </Button>

  <span class="quantity">{quantity}</span>

  <Button noPadding={true} on:click={decrease} disabled={quantity === 1}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="6"
      viewBox="0 0 10 6">
      <polyline
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.25"
        points="0 44 4 48 8 44"
        transform="translate(1 -43)" />
    </svg>
  </Button>
</div>
