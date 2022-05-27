import * as fs from 'fs';

export const detectChanges = (entry, startObject, endObject) => {
  const [key, value] = entry;
  if (!Object.hasOwn(key, endObject) && value !== endObject[key]) {
    return '-';
  }
  if (value !== startObject[key] && value === endObject[key]) {
    return '+';
  }
  return ' ';
};

export const getJSONfromFile = (filepath) => {
  const file = fs.readFileSync(filepath, 'utf8');
  const json = JSON.parse(file);
  return json;
};

export const formatDiff = (changes) => {
  let result = '';
  for (let i = 0; i < changes.length; i += 1) {
    if (i === 0) {
      result += '{';
      result += '\n';
    }

    result += ' '.repeat(2);
    result += `${changes[i].prefix} ${changes[i].key}: ${changes[i].value}`;
    result += '\n';

    if (i === changes.length - 1) {
      result += '}';
    }
  }

  return result;
};
