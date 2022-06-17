import { test, expect } from '@jest/globals';
import { readFile } from './tests-utils.js';
import formatTree from '../src/formatters/stylish.js';
import formatTreeToPlain from '../src/formatters/plain.js';

const DIFF = JSON.parse(readFile('expected', 'diff(hexlet-data).json'));

test('stylish', () => {
  const expected = readFile('expected', 'stylish(hexlet-data).txt');

  expect(formatTree(DIFF)).toEqual(expected);
});

test('plain', () => {
  const expected = readFile('expected', 'plain(hexlet-data).txt');

  expect(formatTreeToPlain(DIFF)).toEqual(expected);
});
