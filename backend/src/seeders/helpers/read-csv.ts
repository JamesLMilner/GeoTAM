import { createReadStream } from 'fs';
import * as csv from 'csv-parser';

export function readCSVToArray(filePath): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const results = [];
    createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}
