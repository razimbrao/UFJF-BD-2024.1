import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../datasource';

export interface CampeonatoModel extends Model<InferAttributes<CampeonatoModel>, InferCreationAttributes<CampeonatoModel>> {
  campId: CreationOptional<number>;
  nome: string;
  dataInicio: string;
  dataFim: string;
  vencedor: number | null;
  createdAt: CreationOptional<string>;
  updatedAt: CreationOptional<string>;
}

export const Campeonatos = sequelize.define<CampeonatoModel>(
  'campeonatos',
  {
    campId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'camp_id'
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dataInicio: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'data_inicio'
    },
    dataFim: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'data_fim'
    },
    vencedor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'times',
        key: 'time_id'
      }
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
