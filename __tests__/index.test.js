import { test, expect } from '@jest/globals';
import YAML from 'js-yaml';
import { getFixturePath, readFile } from './tests-utils.js';
import { generateDifference } from '../src/index.js';

const EXPECTED = readFile('expected', 'diff(hexlet-data).json');

test('trees difference (JSON)', () => {
  const [file1, file2] = [
    getFixturePath('json', 'hexlet-data-1.json'),
    getFixturePath('json', 'hexlet-data-2.json'),
  ];

  expect(generateDifference(file1, file2)).toEqual(JSON.parse(EXPECTED));
});

test('trees difference (YAML)', () => {
  const [file1, file2] = [
    getFixturePath('yaml', 'hexlet-data-1.yml'),
    getFixturePath('yaml', 'hexlet-data-2.yml'),
  ];

  expect(generateDifference(file1, file2)).toEqual(YAML.load(EXPECTED));
});
