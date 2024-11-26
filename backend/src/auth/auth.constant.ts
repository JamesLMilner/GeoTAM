import { loadEnvironmentVariables } from 'src/env-file';

loadEnvironmentVariables();

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};
