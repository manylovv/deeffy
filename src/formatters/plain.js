import isPlainObject from 'lodash.isplainobject';
import isString from 'lodash.isstring';

const getPlainValue = (value) => {
  if (isPlainObject(value)) return '[complex value]';
  if (isString(value)) return `'${value}'`;
  return value;
};

const getCurrentPath = (path, currentName) => [...path, currentName].join('.');

const generateString = (type, path, oldValue, newValue) => {
  const plainOldValue = getPlainValue(oldValue);
  const plainNewValue = getPlainValue(newValue);

  const propertyAndPath = `Property '${path}'`;

  switch (type) {
    case 'changed':
      return `${propertyAndPath} was updated. From ${plainOldValue} to ${plainNewValue}`;

    case 'added':
      return `${propertyAndPath} was added with value: ${plainNewValue}`;

    default:
      return `${propertyAndPath} was removed`;
  }
};

const formatTreeToPlain = (tree) => {
  const iter = (iterableTree, path = []) => iterableTree
    .reduce((acc, current) => {
      if (current.type === 'tree') {
        return [...acc, iter(current.children, [...path, current.key])];
      }

      if (current.type !== 'unchanged') {
        return [...acc, generateString(
          current.type,
          getCurrentPath(path, current.key),
          current.oldValue,
          current.newValue,
        )];
      }

      return acc;
    }, [])
    .join('\n');

  return iter(tree);
};

export default formatTreeToPlain;
