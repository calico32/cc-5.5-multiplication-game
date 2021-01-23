<script lang="ts">
  export let raised = false;
  export let large = false;
  export let color: 'blue' | 'red' | 'green' | 'gray' = 'gray';
</script>

<style lang="scss">
  @import '../colors';

  div {
    &.raised {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
    }

    display: flex;
    @media screen and (max-width: 760px) {
      flex-direction: column;
    }

    :global(button) {
      border: none;
      cursor: pointer;
      outline: none;
      padding: 0.5rem 0.75rem;
      transition: background-color 75ms ease-in-out;

      &:first-of-type {
        border-radius: 8px 0 0 8px;

        @media screen and (max-width: 760px) {
          border-radius: 8px 8px 0 0;
        }
      }

      &:last-of-type {
        border-radius: 0 8px 8px 0;

        @media screen and (max-width: 760px) {
          border-radius: 0 0 8px 8px;
        }
      }
    }

    &.gray :global(button) {
      background-color: cool-gray(200);

      &:hover {
        background-color: cool-gray(300);
      }

      &.active {
        background-color: darken(cool-gray(300), 10%);
      }
    }

    &.blue :global(button) {
      background-color: light-blue(300);

      &:hover {
        background-color: light-blue(400);
      }

      &.active {
        background-color: darken(light-blue(400), 10%);
      }
    }

    &.green :global(button) {
      background-color: lime(300);

      &:hover {
        background-color: lime(400);
      }

      &.active {
        background-color: darken(lime(400), 10%);
      }
    }

    &.red :global(button) {
      background-color: darken(red(200), 5%);

      &:hover {
        background-color: darken(red(300), 5%);
      }

      &.active {
        background-color: darken(red(300), 15%);
      }
    }

    &.large :global(button) {
      font-size: 1.3em;
      font-weight: 600;
      padding: 12px 16px;
    }
  }
</style>

<div class:raised class={color} class:large>
  <slot />
</div>
