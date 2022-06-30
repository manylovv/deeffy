import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
export const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
export const readFile = (filepath) => {
  const fullPath = path.resolve(filepath);
  const data = fs.readFileSync(fullPath).toString();
  return data;
};
export const getFileExtension = (filepath) => path.extname(filepath).slice(1);
