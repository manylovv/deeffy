import { test, expect } from '@jest/globals';
import { getFixturePath, readFixture } from './testUtils.js';
import deeffy from '../src/index.js';

test.each([
  ['json', 'stylish'],
  ['json', 'plain'],
  ['json', 'json'],
  ['yaml', 'stylish'],
  ['yaml', 'plain'],
  ['yaml', 'json'],
  ['yml', 'stylish'],
  ['yml', 'plain'],
  ['yml', 'json'],
])('deeffy (%s - %s)', (extension, format) => {
  const data1 = getFixturePath(`data01.${extension}`);
  const data2 = getFixturePath(`data02.${extension}`);
  const expected = readFixture(`expected-${format}.txt`);

  expect(deeffy(data1, data2, format)).toEqual(expected);
});
