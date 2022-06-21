import generateDifference from './generate-difference.js';
import getFormatter from './formatters/index.js';

const gendiff = (filepath1, filepath2, format) => {
  const diff = generateDifference(filepath1, filepath2);
  const formatter = getFormatter(format);
  return formatter(diff);
};

export default gendiff;
