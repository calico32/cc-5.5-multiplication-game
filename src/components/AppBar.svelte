<script lang="ts">
  import active from 'svelte-spa-router/active';
</script>

<style lang="scss">
  @import '../colors';

  nav {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: cool-gray(100);
    height: 48px;
    display: flex;
    align-items: center;
    z-index: 2;
    color: blue-gray(700);

    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  svg {
    margin-left: 12px;
  }

  a {
    color: blue-gray(700);
    margin-left: 12px;
    font-weight: 600;
    text-decoration: none;
    transition: color 75ms linear;
  }

  :global(nav a.active) {
    font-weight: bold;
    cursor: default;
  }

  :global(nav a:not(.active)) {
    &:hover {
      color: cool-gray(900);
    }
    cursor: pointer;
  }
</style>

<nav>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
  </svg>
  <a href="#/">Multiplication game</a>
</nav>
