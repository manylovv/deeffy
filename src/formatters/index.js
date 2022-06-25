import formatTree from './stylish.js';
import formatTreeToPlain from './plain.js';

export default (data, option) => {
  switch (option) {
    case 'stylish':
      return formatTree(data);
    case 'plain':
      return formatTreeToPlain(data);
    case 'json':
      return JSON.stringify(data, null, 2);
    default:
      throw new Error(`Invalid format option: ${option}`);
  }
};
