import _ from 'lodash';

const generateDifference = (data1, data2) => {
  const iter = (obj1, obj2) => {
    const allKeys = _.union(_.keys(obj1), _.keys(obj2));
    const result = allKeys.map((key) => {
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
          type: 'modified',
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
