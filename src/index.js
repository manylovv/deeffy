import { getParcedData } from './utils.js';
import generateDifference from './generateDifference.js';
import format from './formatters/index.js';

const gendiff = (filepath1, filepath2, formatOption) => {
  const data1 = getParcedData(filepath1);
  const data2 = getParcedData(filepath2);
  const diff = generateDifference(data1, data2);
  return format(diff, formatOption);
};

export default gendiff;
