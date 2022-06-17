import * as fs from 'fs';
import * as path from 'path';
import YAML from 'js-yaml';

const parse = (filepath) => {
  const ext = path.extname(filepath);
  const file = fs.readFileSync(filepath);

  if (ext === '.json') {
    return JSON.parse(file, 'utf8');
  }
  if (ext === '.yml' || ext === '.yaml') {
    return YAML.load(file);
  }

  return null;
};

export default parse;
