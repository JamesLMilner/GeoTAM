import { loadEnvironmentVariables } from '../env-file';

loadEnvironmentVariables();

// console.log('process.env.PRODUCTION_PG_USER', process.env.PRODUCTION_PG_USER);
// console.log(
//   'process.env.PRODUCTION_PG_PASSWORD',
//   process.env.PRODUCTION_PG_PASSWORD,
// );
// console.log('process.env.PRODUCTION_PG_DB', process.env.PRODUCTION_PG_DB);
// console.log('process.env.PRODUCTION_PG_HOST', process.env.PRODUCTION_PG_HOST);
// console.log('process.env.PRODUCTION_PG_PORT', process.env.PRODUCTION_PG_PORT);

module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'geotam',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
  },
  production: {
    username: process.env.PRODUCTION_PG_USER,
    password: process.env.PRODUCTION_PG_PASSWORD,
    database: process.env.PRODUCTION_PG_DB,
    host: process.env.PRODUCTION_PG_HOST,
    port: Number(process.env.PRODUCTION_PG_PORT) || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // Ensure SSL is required
        rejectUnauthorized: false, // Disable certificate verification (optional, see below)
      },
    },
  },
};
