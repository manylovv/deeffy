import _ from 'lodash';

const getSpaces = (quantity) => ' '.repeat(quantity);

const getIndent = (type, level) => {
  if (type === 'nested' || type === 'unchanged') {
    return getSpaces(4 + 4 * (level - 1));
  }

  if (type === 'added'
    || type === 'deleted'
    || type === 'modified') {
    return getSpaces(2 + 4 * (level - 1));
  }

  throw new Error(`Invalid type: ${type}`);
};

const stringify = (value, level) => {
  if (!_.isPlainObject(value)) {
    return value;
  }

  const keys = _.keys(value);
  const generatedTree = keys.map((key) => `${getIndent('nested', level)}${key}: ${stringify(value[key], level + 1)}`);
  return '{\n'
    + generatedTree.join('\n')
    + '\n'
    + getIndent('nested', level - 1)
    + '}';
};

const formatTree = (diff, level = 1) => diff
  .map((current) => {
    const {
      key, type, oldValue, newValue, children = [],
    } = current;

    const stringifiedOldValue = stringify(oldValue, level + 1);
    const stringifiedNewValue = stringify(newValue, level + 1);
    const indent = getIndent(type, level);

    switch (type) {
      case 'added': {
        return `${indent}+ ${key}: ${stringifiedNewValue}`;
      }

      case 'deleted': {
        return `${indent}- ${key}: ${stringifiedOldValue}`;
      }

      case 'unchanged': {
        return `${indent}${key}: ${stringifiedOldValue}`;
      }

      case 'modified': {
        return (
          `${indent}- ${key}: ${stringifiedOldValue}\n`
          + `${indent}+ ${key}: ${stringifiedNewValue}`
        );
      }

      case 'nested': {
        const tree = formatTree(children, level + 1);
        return `${indent}${key}: {\n${tree}\n${indent}}`;
      }

      default: {
        throw new Error(`Invalid type ${type}`);
      }
    }
  })
  .join('\n');

export default (diff) => `{\n${formatTree(diff)}\n}`;
