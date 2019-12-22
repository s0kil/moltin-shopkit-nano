<script>
  import {onMount} from "svelte";
  import {fade, fly} from "svelte/transition";

  import {connect} from "../../model";

  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
  import LoginForm from "../LoginForm.svelte";
  import OrderList from "../OrderList.svelte";
  import Cart from "../Cart.svelte";
  import Checkout from "../Checkout.svelte";

  export let stripeKey;

  const modal = connect("modal");
  const cart = connect("cart");

  $: open = $modal.open;
  $: route = $modal.route;
  $: averageApiRequest = $cart.averageApiRequest;

  $: currentRoute = route => {
    switch (route) {
      case "login":
        return LoginForm;

      case "orders": {
        return OrderList;
      }

      case "shipping":
      case "billing":
        modal.dispatch("loadStripe", stripeKey);
        return Checkout;

      case "cart":
      default:
        return Cart;
    }
  };

  function handleCloseEvent(event) {
    if (open) {
      modal.dispatch("closeModal");
    }
  }
</script>

<style>
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
  }

  .modal {
    transition: all 0.3s ease;
    background-color: #fff;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    overflow-y: scroll;
    height: 100%;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    z-index: 1000000001;
    padding: 1.5rem;
    width: 100%;
    border-width: 0;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif;
    font-size: 15px;
    will-change: transform, opacity;
  }

  /* Hide scroll bar, while still being able to scroll */
  .modal {
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .modal::-webkit-scrollbar {
    width: 0 !important;
  }

  .modal-overlay {
    transition: all 0.3s ease;
    background-color: #333;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000000000;
    opacity: 0.3;
    will-change: opacity;
  }
</style>

{#if open}
  <div
      class="modal-overlay"
      on:click={handleCloseEvent}
      transition:fade={{ duration: averageApiRequest || 300 }}></div>

  <div
      class="modal"
      transition:fly={{ duration: averageApiRequest || 300, x: 525, y: 0 }}>

    <div>
      <Header {route}/>
      <svelte:component this={currentRoute(route)}/>
    </div>

    <Footer/>

  </div>
{/if}
