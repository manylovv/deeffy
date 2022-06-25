import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getFixturePath = (foldername, filename) => path.join(__dirname, '..', '__fixtures__', foldername, filename);
export const readFixture = (foldername, filename) => fs.readFileSync(getFixturePath(foldername, filename), 'utf-8');
export const getDataFromFile = (filepath) => {
  const fullPath = path.resolve(filepath);
  const data = fs.readFileSync(fullPath).toString();
  return data;
};
export const getTypeOfFile = (filepath) => path.extname(filepath).slice(1);
