<script>
  import css from "../helpers/css.js";

  import Spinner from "./Spinner.svelte";

  export let buttonType = "";
  export let buttonSize = "";
  export let buttonStyle = "";
  export let className = "";

  export let loading = false;
  export let noPadding = false;
  export let disabled = false;
  export let block = false;
  export let marginTop = false;

  $: css({
    buttonPadding: noPadding ? 0 : "0 1rem"
  });
</script>

<style>
  button {
    background: none;
    box-sizing: border-box;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
      Helvetica Neue, Arial, Noto Sans, sans-serif;
    font-size: 15px;
    appearance: none;
    border-radius: 0.25rem;
    border: 1px solid transparent;
    font-weight: 500;
    outline: none;

    color: var(--placeholder);
    padding: var(--buttonPadding);
  }

  button:hover {
    cursor: pointer;
  }

  button::before,
  button::after {
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
  }

  button:hover,
  button:focus {
    outline: none;
  }

  button::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  button[type="primary"] {
    height: 2.8rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    color: var(--white);
    border-color: var(--white);
    background-color: var(--primary);
  }

  button[size="large"] {
    height: 3.25rem;
    width: 100%;
  }

  button[type="text"] {
    font-weight: 500;
    text-decoration: underline;
    padding: 0;

    color: var(--dark);
    font-size: var(--textSmall) !important;
  }

  button[type="text"]:hover {
    color: var(--primary);
  }

  button[type="action"] {
    background-color: transparent;
    padding: 0.25rem;
  }

  button[style="cart"] {
    font-size: var(--textSmall);
    text-decoration: none;
    margin-top: 0.5rem;
  }

  button[disabled] {
    opacity: 0.5;
  }

  button[disabled]:hover {
    cursor: not-allowed;
  }
</style>

{#if loading}
  <Spinner />
{:else}
  <button
    {disabled}
    on:click
    type={buttonType}
    style={buttonStyle}
    size={buttonSize}
    class={className}>
    <slot />
  </button>
{/if}
