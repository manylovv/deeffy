import { readFile, getFileExtension } from './utils.js';
import parse from './parser.js';
import generateDifference from './generateDifference.js';
import format from './formatters/index.js';

const gendiff = (filepath1, filepath2, formatOption) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const extension1 = getFileExtension(filepath1);
  const extension2 = getFileExtension(filepath2);

  const parsedFile1 = parse(file1, extension1);
  const parsedFile2 = parse(file2, extension2);

  const diff = generateDifference(parsedFile1, parsedFile2);
  const result = format(diff, formatOption);
  return result;
};

export default gendiff;
