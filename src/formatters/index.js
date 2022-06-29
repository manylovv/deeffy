import formatStylish from './stylish.js';
import formatPlain from './plain.js';

export default (data, option = 'stylish') => {
  switch (option) {
    case 'stylish':
      return formatStylish(data);
    case 'plain':
      return formatPlain(data);
    case 'json':
      return JSON.stringify(data, null, 2);
    default:
      throw new Error(`Invalid format option: ${option}`);
  }
};
