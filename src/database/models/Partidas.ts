import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../datasource';
import { Campeonatos } from './Campeonatos';

export interface PartidaModel extends Model<InferAttributes<PartidaModel>, InferCreationAttributes<PartidaModel>> {
  partidaId: CreationOptional<number>;
  timeA: number;
  timeB: number;
  campId: number;
  resultado: string;
  createdAt: CreationOptional<string>;
  updatedAt: CreationOptional<string>;
}

export const Partidas = sequelize.define<PartidaModel>(
  'partidas',
  {
    partidaId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'partida_id'
    },
    timeA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'times',
        key: 'time_id'
      },
      field: 'time_a'
    },
    timeB: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'times',
        key: 'time_id'
      },
      field: 'time_b'
    },
    campId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'campeonatos',
        key: 'id'
      },
      field: 'camp_id'
    },
    resultado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at'
    }
  }
);

Campeonatos.hasMany(Partidas, { foreignKey: 'campeonatoId' });
Partidas.belongsTo(Campeonatos, { foreignKey: 'campeonatoId' });
