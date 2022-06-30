import _ from 'lodash';

const getUnionKeys = (obj1, obj2) => _.union(_.keys(obj1), _.keys(obj2));

const generateDifference = (data1, data2) => {
  const iter = (obj1, obj2) => {
    const unionKeys = getUnionKeys(obj1, obj2);

    const result = unionKeys.map((key) => {
      if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
        return {
          key,
          type: 'nested',
          children: iter(obj1[key], obj2[key]),
        };
      }

      if (obj1[key] === obj2[key]) {
        return {
          key,
          type: 'unchanged',
          oldValue: obj1[key],
        };
      }

      if (_.has(obj1, key) && !_.has(obj2, key)) {
        return {
          key,
          type: 'deleted',
          oldValue: obj1[key],
        };
      }

      if (!_.has(obj1, key) && _.has(obj2, key)) {
        return {
          key,
          type: 'added',
          newValue: obj2[key],
        };
      }

      if (obj1[key] !== obj2[key]) {
        return {
          key,
          type: 'changed',
          oldValue: obj1[key],
          newValue: obj2[key],
        };
      }

      return new Error(`UNEXPECTED_KEY: ${key}`);
    });

    return _.sortBy(result, 'key');
  };

  return iter(data1, data2);
};

export default generateDifference;
