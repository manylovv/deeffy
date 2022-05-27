import { test, expect } from '@jest/globals';
import gendiff from '../src/gendiff-func';

test('gendiff function works', () => {
  expect(
    gendiff('./__fixtures__/file1.json', './__fixtures__/file2.json'),
  ).toBe(
    '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}',
  );
});
