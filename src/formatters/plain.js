import isPlainObject from 'lodash.isplainobject';
import isString from 'lodash.isstring';

const getPlainValue = (value) => {
  if (isPlainObject(value)) return '[complex value]';
  if (isString(value)) return `'${value}'`;
  return value;
};

const getPath = (path, currentName) => [...path, currentName].join('.');

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
  const result = [];
  const iter = (iterableTree, path) => {
    iterableTree.forEach((current) => {
      const [currentType, currentPath, oldValue, newValue] = [
        current.type,
        getPath(path, current.key),
        current.oldValue,
        current.newValue,
      ];

      if (current.type === 'tree') {
        return iter(current.children, [...path, current.key]);
      }

      if (current.type !== 'unchanged') {
        return result.push(
          generateString(currentType, currentPath, oldValue, newValue),
        );
      }

      return null;
    });
  };
  iter(tree, []);
  return result.join('\n');
};

export default formatTreeToPlain;
