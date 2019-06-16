<script>
  export let htmlFor, required;
</script>

<style>
  label {
    display: inline-flex;
    color: var(--dark);
    cursor: pointer;
    font-weight: 500;
    margin: 0.75rem 0;
  }

  span {
    margin-left: 0.25rem;
    color: var(--placeholder);
    font-weight: 400;
  }
</style>

<label for={htmlFor}>
  <slot />

  {#if required}
    <span>*</span>
  {/if}
</label>
