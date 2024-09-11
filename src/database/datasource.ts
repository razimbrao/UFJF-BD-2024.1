import { Sequelize, Dialect } from 'sequelize';
import { db } from '../config';

export const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: db.dialect as Dialect
});
