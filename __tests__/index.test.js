import { test, expect } from '@jest/globals';
import { getFixturePath, readFixture } from '../src/utils.js';
import gendiff from '../src/index.js';

const getDataForTest = (extension, format) => ({
  data1: getFixturePath(extension, `data01.${extension}`),
  data2: getFixturePath(extension, `data02.${extension}`),
  expected: readFixture('expected', `${format}.txt`),
  format,
  extension,
});

test.each([
  getDataForTest('json', 'stylish'),
  getDataForTest('json', 'plain'),
  getDataForTest('json', 'json'),
  getDataForTest('yaml', 'stylish'),
  getDataForTest('yaml', 'plain'),
  getDataForTest('yaml', 'json'),
])('gendiff ($extension: $format)', ({
  data1, data2, expected, format,
}) => {
  expect(gendiff(data1, data2, format)).toEqual(expected);
});
