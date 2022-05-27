import { detectChanges, getJSONfromFile, formatDiff } from './utils';

const gendiff = (filepath1, filepath2) => {
  const [json1, json2] = [
    getJSONfromFile(filepath1),
    getJSONfromFile(filepath2),
  ];

  const entries = [...Object.entries(json1), ...Object.entries(json2)];
  const sortedEntries = entries.sort((a, b) => a[0].localeCompare(b[0]));
  const uniqueEntries = Array.from(
    new Set(sortedEntries.map(JSON.stringify)),
    JSON.parse,
  );

  const result = [];
  const { length } = uniqueEntries;
  for (let i = 0; i < length; i += 1) {
    const [key, value] = uniqueEntries[i];
    const prefix = detectChanges(uniqueEntries[i], json1, json2);
    result.push({ prefix, key, value });
  }

  return formatDiff(result);
};

export default gendiff;
