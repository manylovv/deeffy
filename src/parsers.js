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

  return new Error(`UNABLE_TO_PARSE_FILE: '${filepath}'`);
};

export default parse;
