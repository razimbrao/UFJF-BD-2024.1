// import { config } from 'dotenv';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { config } = require('dotenv');
config();

module.exports = {
  [process.env.NODE_ENV]: {
    dialect: process.env.DB_DIALECT ?? 'postgres',
    database: process.env.DB_DATABASE || '',
    host: process.env.DB_HOST || '',
    port: Number(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER || '',
    password: process.env.DB_USER_PWD || '',
    minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE || '5'),
    maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || '10')
  }
};
