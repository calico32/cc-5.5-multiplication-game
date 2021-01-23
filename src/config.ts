import { derived, writable } from 'svelte/store';

const existingDifficulty = localStorage.getItem('difficulty');
const existingPenalize = localStorage.getItem('penalize');

export const difficulty = writable((existingDifficulty && parseInt(existingDifficulty, 10)) || 1);
export const penalizeBlunders = writable(existingPenalize ? existingPenalize === 'true' : false);

difficulty.subscribe(value => {
  localStorage.setItem('difficulty', value.toString());
});

penalizeBlunders.subscribe(value => {
  localStorage.setItem('penalize', value.toString());
});

export const ranges: [min: number, max: number][] = [
  [1, 5],
  [4, 12],
  [12, 40],
  [45, 120],
  [2 ** 10, 2 ** 32],
];

export const names: string[] = ['Easy', 'Normal', 'Difficult', 'Insane', 'Impossible'];

export const name = derived(difficulty, diff => names[diff]);
export const range = derived(difficulty, diff => ({ min: ranges[diff][0], max: ranges[diff][1] }));
