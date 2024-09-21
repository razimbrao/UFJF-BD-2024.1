import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../datasource';
import { Tournaments } from './Tournaments';
import { Matches } from './Matches';
import { Players } from './Players';

export interface TeamModel extends Model<InferAttributes<TeamModel>, InferCreationAttributes<TeamModel>> {
  id: CreationOptional<string>;
  name: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamsTournamentsModel extends Model<InferAttributes<TeamsTournamentsModel>, InferCreationAttributes<TeamsTournamentsModel>> {
  teamId: string;
  tournamentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamsMatchesModel extends Model<InferAttributes<TeamsMatchesModel>, InferCreationAttributes<TeamsMatchesModel>> {
  teamId: string;
  matchId: string;
  createdAt: string;
  updatedAt: string;
}

export const Teams = sequelize.define<TeamModel>(
  'teams',
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
    logo: {
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

export const TeamsTournaments = sequelize.define<TeamsTournamentsModel>(
  'teams_tournaments',
  {
    teamId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id'
      },
      field: 'team_id'
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

export const TeamMatches = sequelize.define<TeamsMatchesModel>(
  'teams_matches',
  {
    teamId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id'
      },
      field: 'team_id'
    },
    matchId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'matches',
        key: 'id'
      },
      field: 'match_id'
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

Teams.belongsToMany(Tournaments, { through: TeamsTournaments, foreignKey: 'teamId' });
Tournaments.belongsToMany(Teams, { through: TeamsTournaments, foreignKey: 'tournamentId' });

Teams.belongsToMany(Matches, { through: TeamMatches, foreignKey: 'teamId' });
Matches.belongsToMany(Teams, { through: TeamMatches, foreignKey: 'matchId' });

Teams.hasMany(Players, { foreignKey: 'teamId' });
Players.belongsTo(Teams, { foreignKey: 'teamId' });
