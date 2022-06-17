import isPlainObject from 'lodash.isplainobject';

const getSpaces = (quantity) => ' '.repeat(quantity);

const getIndent = (level) => getSpaces(2 + 4 * (level - 1));

const getIndentForUnchanged = (level) => getSpaces(4 + 4 * (level - 1));

const getRightIndent = (type, level) => (type === 'unchanged' || type === 'tree'
  ? getIndentForUnchanged(level)
  : getIndent(level));

const stringify = (value, level) => {
  if (!isPlainObject(value)) {
    return value;
  }

  const keys = Object.keys(value);
  const previousLevel = level - 1;
  const nextLevel = level + 1;
  const result = keys.map(
    (key) => `${getIndentForUnchanged(level)}${key}: ${stringify(
      value[key],
      nextLevel,
    )}`,
  );

  return `{\n${result.join('\n')}\n${getIndentForUnchanged(previousLevel)}}`;
};

const generateNode = (key, type, indent, oldValue, newValue) => {
  const PLUS = '+';
  const MINUS = '-';

  switch (type) {
    case 'added': {
      return `${indent}${PLUS} ${key}: ${newValue}`;
    }

    case 'deleted': {
      return `${indent}${MINUS} ${key}: ${oldValue}`;
    }

    case 'unchanged': {
      return `${indent}${key}: ${oldValue}`;
    }

    case 'changed': {
      return (
        `${indent}${MINUS} ${key}: ${oldValue}\n`
        + `${indent}${PLUS} ${key}: ${newValue}`
      );
    }

    default:
      return `${indent}${key}: {\n${oldValue}\n${indent}}`;
  }
};

const formatTree = (diff, level = 1) => diff
  .map((current) => {
    const [key, type, oldValue, newValue] = [
      current.key,
      current.type,
      current.oldValue,
      current.newValue,
    ];
    const rigthIndent = getRightIndent(type, level);

    if (type === 'tree') {
      const tree = formatTree(current.children, level + 1);
      return generateNode(key, type, rigthIndent, tree, null);
    }

    return generateNode(
      key,
      type,
      rigthIndent,
      stringify(oldValue, level + 1),
      stringify(newValue, level + 1),
    );
  })
  .join('\n');

export default (diff) => `{\n${formatTree(diff)}\n}`;
