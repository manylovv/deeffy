import _ from 'lodash';

const getSpaces = (quantity) => ' '.repeat(quantity);

const wrapInBrackets = (value, indent) => `{\n${value}\n${indent}}`;

const stringify = (value, level) => {
  if (!_.isPlainObject(value)) {
    return value;
  }

  const generatedTree = _.keys(value)
    .map((key) => `${getSpaces(4 + 4 * (level))}${key}: ${stringify(
      value[key],
      level + 1,
    )}`)
    .join('\n');

  return wrapInBrackets(generatedTree, getSpaces(4 + 4 * (level - 1)));
};

const formatStylish = (diff, level = 1) => diff
  .map((current) => {
    const {
      key, type, oldValue, newValue, children = [],
    } = current;

    const stringifiedOldValue = stringify(oldValue, level);
    const stringifiedNewValue = stringify(newValue, level);

    switch (type) {
      case 'added': {
        // не знаю как можно избавиться от констант в каждом кейсе,
        // чтобы при этом осталось читаемость, и не было бы дополнительной проверки по типам
        const indent = getSpaces(2 + 4 * (level - 1));
        return `${indent}+ ${key}: ${stringifiedNewValue}`;
      }

      case 'deleted': {
        const indent = getSpaces(2 + 4 * (level - 1));
        return `${indent}- ${key}: ${stringifiedOldValue}`;
      }

      case 'unchanged': {
        const indent = getSpaces(4 + 4 * (level - 1));
        return `${indent}${key}: ${stringifiedOldValue}`;
      }

      case 'changed': {
        const indent = getSpaces(2 + 4 * (level - 1));
        return (
          `${indent}- ${key}: ${stringifiedOldValue}\n`
            + `${indent}+ ${key}: ${stringifiedNewValue}`
        );
      }

      case 'nested': {
        const indent = getSpaces(4 + 4 * (level - 1));
        const tree = formatStylish(children, level + 1);
        return `${indent}${key}: ${wrapInBrackets(tree, indent)}`;
      }

      default: {
        throw new Error(`Invalid type ${type}`);
      }
    }
  })
  .join('\n');

export default (diff) => `{\n${formatStylish(diff)}\n}`;
