<script>
  import css from "../helpers/css.js";

  import Label from "./Label.svelte";

  export let label, name, autoFocus, placeholder, propsError, required, value;

  // TODO : Set Up Error Handler
  const error = null;

  css({
    inputBorder: error ? "var(--error)" : "var(--border)"
  });
</script>

<style>
  div {
    width: 100%;
  }

  input {
    background-color: var(--white);
    border-radius: 0.25rem;
    color: var(--dark);
    display: block;
    font-family: inherit;
    font-size: 100%;
    font-weight: 400;
    padding: 0.75rem 1rem;
    margin: 0;
    overflow: visible;
    outline: none;
    width: 100%;

    border: 1px solid var(--inputBorder);
  }
  input::-webkit-input-placeholder {
    color: var(--placeholder);
  }
  input::-moz-placeholder {
    color: var(--placeholder);
  }
  input:-ms-input-placeholder {
    color: var(--placeholder);
  }
  input:-moz-placeholder {
    color: var(--placeholder);
  }
  input:hover {
    cursor: text;
  }

  span {
    color: var(--error);
    display: inline-block;
    padding-top: 0.75rem;
  }
</style>

<div>
  {#if label}
    <Label htmlFor={name} {error} {required}> {label}</Label>
  {/if}

  <input
    bind:value
    id={name}
    {autoFocus}
    placeholder={placeholder || label}
    {error} />

  {#if error}
    <span>{error}</span>
  {/if}
</div>
