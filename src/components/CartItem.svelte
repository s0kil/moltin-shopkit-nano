<script>
  import { slide } from "svelte/transition";

  import Button from "./Button.svelte";
  import ShopkitIcon from "./ShopkitIcon.svelte";
  import QuantityStepper from "./QuantityStepper.svelte";

  export let id;
  export let name;
  export let meta;
  export let image;
  export let quantity;
  export let updateItem;
  export let removeFromCart;
  export let averageApiRequest;

  const { href } = image;
  const {
    display_price: {
      without_tax: {
        unit: { formatted: unit }
      }
    }
  } = meta;

  let disabled = false;

  function handleRemove() {
    disabled = true;
    removeFromCart(id);
  }

  function handleQuantityChange(data) {
    if (data.quantity === 0) removeFromCart(id);
    else {
      quantity = data.quantity;
      updateItem(data);
    }
  }
</script>

<style>
  .wrapper {
    display: flex;
    padding: 0.75rem 0;
    width: 100%;
  }

  .photo-box {
    border: var(--border);
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-right: 1rem;
    width: 75px;
    height: 75px;
  }

  .photo-box img {
    max-width: 100%;
    border-radius: 0.25rem;
    overflow: hidden;
  }

  .info {
    align-items: center;
    /* display: flex; */
    flex: 1;
    font-size: var(--textBase);
    justify-content: space-between;
    color: var(--dark);
    margin: 0;
    line-height: 1.5;
  }

  .product-name {
    color: var(--dark);
    font-size: var(--textBase);
    font-weight: 500;
    margin: 0;
  }

  .product-price {
    color: var(--placeholder);
    font-size: var(--textSmall);
    margin: 0;
  }

  .extra {
    margin-left: 1.5rem;
  }

  .disabled {
    opacity: 0.5;
  }
  .disabled:hover {
    cursor: not-allowed;
  }
</style>

<div
  class:disabled
  class="wrapper"
  out:slide={{ duration: averageApiRequest || 300 }}>

  <div class="photo-box">
    {#if href}
      <img src={href} title={name} alt={name} />
    {:else}
      <ShopkitIcon />
    {/if}
  </div>

  <div class="info">
    <p class="product-name">{name}</p>
    <p class="product-price">{unit}</p>

    <Button
      buttonStyle="cart"
      buttonType="text"
      noPadding={true}
      {disabled}
      on:click={handleRemove}>
      Remove
    </Button>

  </div>

  <div class="extra">
    <QuantityStepper itemId={id} {quantity} updateItem={handleQuantityChange} />
  </div>

</div>
