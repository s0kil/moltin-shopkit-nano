<script>
  import Logo from "./Logo.svelte";
</script>

<style>
  div {
    align-items: center;
    display: flex;
  }

  a {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    font-family: inherit;
    font-size: 100%;
    text-decoration: none;
    margin: 0 auto;
    transition: opacity 0.1s ease-in;
  }

  span {
    margin-right: 0.5rem;
    color: var(--placeholder);
    font-size: var(--textSmall);
  }
</style>

<div>
  <a
    href="https://www.moltin.com/commerce-solutions/embeddable-cart"
    target="_blank">

    <span>Powered by</span>

    <Logo />

  </a>
</div>
