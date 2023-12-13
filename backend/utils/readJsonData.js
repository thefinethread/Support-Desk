import fs from 'fs/promises';
import path from 'path';

const readJsonData = async (filename) => {
  const filePath = path.resolve('./backend/data/' + filename + '.json');
  try {
    const contents = await fs.readFile(filePath);
    return JSON.parse(contents);
  } catch (error) {
    throw new Error('Could not read the file');
  }
};

export default readJsonData;
