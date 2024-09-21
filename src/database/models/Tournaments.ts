import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../datasource';

export interface TournamentModel extends Model<InferAttributes<TournamentModel>, InferCreationAttributes<TournamentModel>> {
  id: CreationOptional<string>;
  name: string;
  start: string;
  end: string;
  winnerTeam: string | null;
  createdAt: CreationOptional<string>;
  updatedAt: CreationOptional<string>;
}

export const Tournaments = sequelize.define<TournamentModel>(
  'tournaments',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false
    },
    winnerTeam: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'teams',
        key: 'id'
      },
      field: 'winner_team'
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
