import * as fs from 'fs';
import * as path from 'path';
import parce from './parser.js';

const getParsedData = (filepath) => {
  const fullPath = path.resolve(filepath);
  const data = fs.readFileSync(fullPath).toString();
  const extension = path.extname(filepath).slice(1);
  return parce(data, extension);
};

export default getParsedData;
