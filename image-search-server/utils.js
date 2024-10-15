import fs from 'fs';
import path from 'path';

export function getFilePaths(directory) {
    try {
      const files = fs.readdirSync(directory);
      const filePaths = files.map(file => path.join(directory, file));
      return filePaths;
    } catch (err) {
      console.error('Error reading directory:', err);
      return [];
    }
  }
