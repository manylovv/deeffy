import { test, expect } from '@jest/globals';
import YAML from 'js-yaml';
import { getFixturePath, readFile } from './tests-utils.js';
import { generateDifference } from '../src/index.js';

test('trees difference (JSON)', () => {
  const file1 = getFixturePath('json', 'hexlet-data-1.json');
  const file2 = getFixturePath('json', 'hexlet-data-2.json');
  const expected = readFile('expected', 'diff(hexlet-data).json');

  expect(generateDifference(file1, file2)).toEqual(JSON.parse(expected));
});

test('trees difference (YAML)', () => {
  const file1 = getFixturePath('yaml', 'hexlet-data-1.yml');
  const file2 = getFixturePath('yaml', 'hexlet-data-2.yml');
  const expected = readFile('expected', 'diff(hexlet-data).json');

  expect(generateDifference(file1, file2)).toEqual(YAML.load(expected));
});
