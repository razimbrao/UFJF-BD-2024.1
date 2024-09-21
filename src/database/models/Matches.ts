import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../datasource';
import { Tournaments } from './Tournaments';

export interface MatchModel extends Model<InferAttributes<MatchModel>, InferCreationAttributes<MatchModel>> {
  id: CreationOptional<string>;
  teamA: string;
  teamB: string;
  tournamentId: string;
  result: string;
  createdAt: CreationOptional<string>;
  updatedAt: CreationOptional<string>;
}

export const Matches = sequelize.define<MatchModel>(
  'matches',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    teamA: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id'
      },
      field: 'team_a'
    },
    teamB: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id'
      },
      field: 'team_b'
    },
    tournamentId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'tournaments',
        key: 'id'
      },
      field: 'tournament_id'
    },
    result: {
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

Tournaments.hasMany(Matches, { foreignKey: 'tournamentId' });
Matches.belongsTo(Tournaments, { foreignKey: 'tournamentId' });
