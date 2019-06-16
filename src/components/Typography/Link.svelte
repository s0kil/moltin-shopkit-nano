<script>
  export let href = "";
</script>

<style>
  a {
    color: var(--dark);
    text-decoration: underline;
  }

  a:hover {
    color: var(--primary);
  }
</style>

<a {href}>
  <slot />
</a>
