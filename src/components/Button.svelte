<script lang="ts">
  export let disabled = false;
  export let large = false;
  export let raised = false;
  export let color: 'red' | 'green' | 'blue' | 'gray' = 'gray';
  export let classes: string | undefined = undefined;
</script>

<style lang="scss">
  @import '../colors';

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 10px;
    font-size: 0.85em;
    cursor: pointer;
    border-width: 1px;
    border-style: solid;
    border-radius: 8px;
    transition: background-color 200ms ease-in-out, border-color 200ms ease-in-out;

    &.gray {
      border-color: cool-gray(200);
      background-color: cool-gray(200);

      &:hover {
        border-color: cool-gray(300);
        background-color: cool-gray(300);
      }
    }

    &.blue {
      border-color: light-blue(300);
      background-color: light-blue(300);

      &:hover {
        border-color: light-blue(400);
        background-color: light-blue(400);
      }
    }

    &.green {
      border-color: lime(300);
      background-color: lime(300);

      &:hover {
        border-color: lime(400);
        background-color: lime(400);
      }
    }

    &.red {
      border-color: darken(red(200), 5%);
      background-color: darken(red(200), 5%);

      &:hover {
        border-color: darken(red(300), 5%);
        background-color: darken(red(300), 5%);
      }
    }

    &.large {
      font-size: 1.3em;
      font-weight: 600;
      padding: 8px 12px;
    }

    &.raised {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
    }
  }
</style>

<button {disabled} on:click class:large class:raised class="{color} {classes}">
  <slot />
</button>
