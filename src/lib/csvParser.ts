export const createCSV = (header: string[], rows: string[][]): string => {
  let result = header.join(';');
  result += '\n';
  rows.forEach((row) => {
    result += row.join(';');
    result += '\n';
  });
  return result;
};
