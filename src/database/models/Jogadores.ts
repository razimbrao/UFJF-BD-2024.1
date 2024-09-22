import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../datasource';

export interface JogadorModel extends Model<InferAttributes<JogadorModel>, InferCreationAttributes<JogadorModel>> {
  usuarioId: string;
  riotId: string;
  timeId: string;
  createdAt: CreationOptional<string>;
  updatedAt: CreationOptional<string>;
}

export const Jogadores = sequelize.define<JogadorModel>(
  'players',
  {

    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'usuario_id'
      },
      field: 'usuario_id',
      primaryKey: true
    },
    riotId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'riot_id'
    },
    timeId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'times',
        key: 'time_id'
      },
      field: 'time_id'
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
