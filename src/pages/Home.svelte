<script lang="ts">
  import { push } from 'svelte-spa-router';
  import { fade } from 'svelte/transition';
  import Button from '../components/Button.svelte';
  import ButtonGroup from '../components/ButtonGroup.svelte';
  import { difficulty, names, penalizeBlunders } from '../config';
</script>

<style lang="scss">
  @import '../colors';

  #home {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    text-align: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 760px) {
      flex-direction: row;
    }
  }

  .penalize {
    user-select: none;
    margin-top: 1.5rem;
    label {
      cursor: pointer;
    }
    input {
      cursor: pointer;
      margin-right: 0.5rem;
    }
  }

  :global(.play) {
    margin-top: 1.5rem;

    svg {
      margin-right: 8px;
    }

    @media screen and (max-width: 760px) {
      margin-top: 0;
      margin-left: 2rem;
    }
  }
</style>

<div in:fade={{ duration: 100 }} id="home">
  <h1>Welcome to multiplication game</h1>
  <div class="content">
    <ButtonGroup raised color="blue">
      {#each names as name, index}
        <button on:click={() => ($difficulty = index)} class:active={$difficulty === index}>
          {name}
        </button>
      {/each}
    </ButtonGroup>

    <div class="penalize">
      <input type="checkbox" id="penalize-checkbox" bind:checked={$penalizeBlunders} />
      <label for="penalize-checkbox">Penalize mistakes</label>
    </div>

    <Button large raised color="green" classes="play" on:click={() => push('#/play')}>
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        stroke-width="2"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
      Play
    </Button>
  </div>
</div>
