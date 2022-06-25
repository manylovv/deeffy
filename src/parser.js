import YAML from 'js-yaml';

export default (data, type) => {
  if (type === 'json') {
    return JSON.parse(data, 'utf-8');
  }

  if (type === 'yml' || type === 'yaml') {
    return YAML.load(data);
  }

  throw new Error(`Unknown type ${type}`);
};
