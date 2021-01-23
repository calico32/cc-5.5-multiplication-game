<script lang="ts">
  import { subSeconds } from 'date-fns';
  import { onDestroy, onMount } from 'svelte';
  import { push } from 'svelte-spa-router';
  import Button from '../components/Button.svelte';
  import Message from '../components/Message.svelte';
  import { name, penalizeBlunders, range } from '../config';
  import { Timer } from '../timer';

  const random = () => Math.floor(Math.random() * ($range.max - $range.min)) + $range.min;

  const timer = new Timer();
  let time: string | undefined;

  const unsubscribe = timer.formattedTime.subscribe(v => (time = v));

  let question = 1;
  let blunders = 0;

  let factors: [number, number] = [random(), random()];

  let message: string | undefined;
  let colors: [string, string] = ['', ''];

  let inputValue: string | undefined;

  const submit = () => {
    if (!inputValue) {
      return;
    }

    const parsed = parseInt(inputValue, 10);

    if (Number.isNaN(parsed) || !Number.isFinite(parsed)) {
      blunders++;
      inputValue = '';
      colors = ['#e11d48', '#fb718599'];
      if ($penalizeBlunders) timer.startTime = subSeconds(timer.startTime!, 4);
      // wierd hack to get message component to rerender
      // withot the spaces, the message is the same and isn't invaidated
      message = `Invalid answer!${$penalizeBlunders ? ' +4.00' : ''}${' '.repeat(blunders % 2)}`;
      return;
    }

    if (parsed !== factors[0] * factors[1]) {
      blunders++;
      inputValue = '';
      colors = ['#e11d48', '#fb718599'];
      if ($penalizeBlunders) timer.startTime = subSeconds(timer.startTime!, 4);
      message = `Incorrect!${$penalizeBlunders ? ' +4.00' : ''}${' '.repeat(blunders % 2)}`;
      return;
    }

    question++;

    if (question > 10) {
      timer.stop();

      colors = ['#65a30d', '#a3e63599'];
      message =
        `Correct! You finished on <strong>${$name}</strong> difficulty ` +
        `in <strong>${time}</strong> ` +
        `with <strong>${blunders}</strong> mistake${blunders === 1 ? '' : 's'}!`;
    } else {
      factors = [random(), random()];
      colors = ['#65a30d', '#a3e63599'];
      message = 'Correct! Next question:';
      inputValue = '';
    }
  };

  onMount(() => {
    timer.start();
  });

  onDestroy(() => {
    timer.stop();
    unsubscribe();
  });
</script>

<style lang="scss">
  @import '../colors';

  #play {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    :global(span) {
      display: block;
      text-align: center;
      margin: 0 0 8px;
    }
  }

  .response {
    display: flex;
    height: 30px;

    input {
      margin-right: 0.5rem;
      font-size: 0.85rem;
      display: flex;
      border-radius: 8px;
      outline: none;
      border-top-color: cool-gray(200);
      border-left-color: cool-gray(200);
      border-style: inset;
      border-image: initial;
      padding: 0 0.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
      border-width: 0;
      transition: border-width 150ms ease-in-out;
      background-color: white;
      border-width: 2px;
    }
  }

  :global(.return) {
    margin-top: 0rem;

    svg {
      margin-right: 8px;
    }
  }
</style>

<div id="play">
  <span id="timer">{time}</span>
  <span class="difficulty">Difficulty: {$name.toLowerCase()}</span>

  {#if message}
    <Message {message} {colors} />
  {/if}

  {#if question <= 10}
    <span class="question">Question {question}: {factors[0]} × {factors[1]}</span>
    <div class="response">
      <!-- svelte-ignore a11y-autofocus -->
      <input
        bind:value={inputValue}
        on:keypress={e => e.key === 'Enter' && submit()}
        autofocus
        autocomplete="off"
        autocapitalize="off"
      />
      <Button on:click={submit} color="blue" raised>Check</Button>
    </div>
  {:else}
    <Button on:click={() => push('#/')} color="blue" classes="return" large raised>
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
        <line x1="17" y1="17" x2="7" y2="7" />
        <polyline points="7 17 7 7 17 7" />
      </svg>
      Return
    </Button>
  {/if}
</div>
