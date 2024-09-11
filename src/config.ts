// Mapper for environment variables
import * as dotenv from 'dotenv';
import * as sequelizeConfig from './database/sequelize.config.js';

dotenv.config();
export const environment = process.env.NODE_ENV || 'development';
export const port = Number(process.env.PORT ?? '3000');

// @ts-expect-error sequelize should work with js file config
export const db = sequelizeConfig[environment];
