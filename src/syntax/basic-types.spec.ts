/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect, test } from 'vitest';

test('Can use the toSorted Thing', () => {
  const numbers = [10, 20, 19, 3, 12, 108, 1];

  const newNumbers = numbers.toSorted();

  expect(newNumbers).toEqual([1, 10, 108, 12, 19, 20, 3]);
});

test('let vs const', () => {
  let yourAge: number;
  yourAge = 32;
  yourAge = 33;

  // arrays and objects are immutable when they're a const
  // but they're properties or members can be mutated

  const performanceEvals = [3, 2, 4, 5, 5, 3];

  //performanceEvals = [5,5,5,4]; not allowed because const

  performanceEvals[1] = 5; // can reassign items in the array.

  const performanceEvals2 = [489, 457, 333, 48] as const;
  // performanceEvals2[1] = 3; not allowed because const
});
