<script>
  import Label from "../Label.svelte";
  import Input from "../Input.svelte";
  import Button from "../Button.svelte";

  import { connect } from "../../model";

  const cart = connect("cart");

  export let addPromotion,
    error = null;

  let promotionCode = "";

  $: console.log($cart.error);

  function submit() {
    addPromotion(promotionCode);
  }
</script>

<style>
  div {
    align-items: start;
    display: flex;
    width: 100%;
  }
</style>

<form on:submit|preventDefault={submit}>
  <Label htmlFor="code">Gift card or discount code</Label>

  <div>
    <Input
      bind:value={promotionCode}
      name="code"
      placeholder="Enter a code"
      {error}
      autoComplete="off" />

    <Button style="margin-left: 0.5rem" buttonType="primary" on:click={submit}>
      Apply
    </Button>
  </div>
</form>
