import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { existsSync } from 'fs';

export function loadEnvironmentVariables() {
  // Load environment variables from .env file
  const configPath = resolve(__dirname, '../../../.env');
  console.log('Using .env file from: ', configPath);
  console.log('');

  // Check it exsists
  const checkExists = existsSync(configPath);
  if (!checkExists) {
    throw new Error('Cannot find .env file');
  }

  // Actually load in the environment variables
  dotenv.config({ path: configPath });
}
