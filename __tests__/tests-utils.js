import { fileURLToPath } from 'url';
import * as fs from 'fs';
import * as path from 'path';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getFixturePath = (foldername, filename) => path.join(__dirname, '.', '__fixtures__', foldername, filename);
export const readFile = (foldername, filename) => fs.readFileSync(getFixturePath(foldername, filename), 'utf-8');
