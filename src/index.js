import { getDataFromFile, getTypeOfFile } from './utils.js';
import parse from './parser.js';
import generateDifference from './generate-difference.js';
import format from './formatters/index.js';

const getDataAndType = (filepath) => ([getDataFromFile(filepath), getTypeOfFile(filepath)]);

const gendiff = (filepath1, filepath2, formatOption) => {
  const [file1, type1] = getDataAndType(filepath1);
  const [file2, type2] = getDataAndType(filepath2);
  const [parsedFile1, parsedFile2] = [
    parse(file1, type1),
    parse(file2, type2),
  ];

  const diff = generateDifference(parsedFile1, parsedFile2);
  const result = format(diff, formatOption);
  return result;
};

export default gendiff;
