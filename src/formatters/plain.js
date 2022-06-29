import _ from 'lodash';

const getPropertyName = (path, currentName) => [...path, currentName].join('.');

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const formatPlain = (tree) => {
  const iter = (iterableTree, path = []) => iterableTree
    .map((current) => {
      const currentPath = getPropertyName(path, current.key);
      switch (current.type) {
        case 'nested': {
          return iter(current.children, [...path, current.key]);
        }

        case 'changed': {
          return `Property '${currentPath}' was updated. From ${stringify(
            current.oldValue,
          )} to ${stringify(current.newValue)}`;
        }

        case 'added': {
          return `Property '${currentPath}' was added with value: ${stringify(
            current.newValue,
          )}`;
        }

        case 'deleted': {
          return `Property '${currentPath}' was removed`;
        }

        case 'unchanged': {
          return null;
        }

        default: {
          throw new Error(`Invalid type: ${current.type}`);
        }
      }
    })
    .filter((current) => current !== null)
    .join('\n');
  return iter(tree);
};

export default formatPlain;
