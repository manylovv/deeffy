import formatTree from './stylish.js';
import formatTreeToJSON from './json.js';
import formatTreeToPlain from './plain.js';

export default (option) => {
  switch (option) {
    case 'plain':
      return formatTreeToPlain;
    case 'json':
      return formatTreeToJSON;
    default:
      return formatTree;
  }
};
