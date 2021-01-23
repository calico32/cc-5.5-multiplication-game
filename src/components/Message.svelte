<script lang="ts">
  import { afterUpdate } from 'svelte';

  export let message: string;
  export let colors: [string, string];

  let element: HTMLElement;

  const flash = (element: HTMLElement) => {
    requestAnimationFrame(() => {
      element.style.transition = 'none';
      element.style.color = colors[0];
      element.style.backgroundColor = colors[1];

      setTimeout(() => {
        element.style.transition = 'color 1s, background 1s';
        element.style.color = '';
        element.style.backgroundColor = '';
      });
    });
  };

  afterUpdate(() => {
    flash(element);
  });
</script>

<style lang="scss">
  span {
    padding: 8px;
    border-radius: 8px;
  }
</style>

<span bind:this={element}>{@html message}</span>
