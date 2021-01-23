<script>
  import { push } from 'svelte-spa-router';
</script>

<h2>Not found</h2>
<button on:click={() => push('#/')}>Go home</button>
