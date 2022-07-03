import _ from 'lodash';

const getIndent = (depth, typeOfIndent) => {
  const indentTypes = {
    key: 2,
    tree: 4,
    bracket: 4,
  };

  return ' '.repeat(indentTypes[typeOfIndent] + 4 * (depth));
};

const stringify = (key, value, prefix, depth) => {
  if (!_.isPlainObject(value)) {
    return `${getIndent(depth, 'key')}${prefix} ${key}: ${value}`;
  }

  const nestedKeys = Object.keys(value);
  const stringifiedTree = nestedKeys
    .map((nestedKey) => stringify(nestedKey, value[nestedKey], ' ', depth + 1))
    .join('\n');

  const keyIndent = getIndent(depth, 'key');
  const bracketIndent = getIndent(depth, 'bracket');
  return `${keyIndent}${prefix} ${key}: {\n${stringifiedTree}\n${bracketIndent}}`;
};

const formatStylish = (diff, depth = 0) => diff
  .map((current) => {
    switch (current.type) {
      case 'added': {
        return stringify(current.key, current.newValue, '+', depth);
      }

      case 'deleted': {
        return stringify(current.key, current.oldValue, '-', depth);
      }

      case 'unchanged': {
        return stringify(current.key, current.oldValue, ' ', depth);
      }

      case 'changed': {
        return (
          `${stringify(current.key, current.oldValue, '-', depth)}\n`
          + `${stringify(current.key, current.newValue, '+', depth)}`
        );
      }

      case 'nested': {
        const tree = formatStylish(current.children, depth + 1);
        const treeIndent = getIndent(depth, 'tree');
        const bracketIndent = getIndent(depth, 'bracket');
        return `${treeIndent}${current.key}: {\n${tree}\n${bracketIndent}}`;
      }

      default: {
        throw new Error(`Invalid type ${current.type}`);
      }
    }
  })
  .join('\n');

export default (diff) => `{\n${formatStylish(diff)}\n}`;
