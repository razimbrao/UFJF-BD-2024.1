import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../datasource';

export interface JogadorModel extends Model<InferAttributes<JogadorModel>, InferCreationAttributes<JogadorModel>> {
  usuarioId: number;
  riotId: string;
  timeId: number;
}

export const Jogadores = sequelize.define<JogadorModel>(
  'jogador',
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
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'times',
        key: 'time_id'
      },
      field: 'time_id'
    }
  },
  {
    tableName: 'jogador',
    timestamps: false
  }
);
