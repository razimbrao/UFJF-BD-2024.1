import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../datasource';

export interface PlayerModel extends Model<InferAttributes<PlayerModel>, InferCreationAttributes<PlayerModel>> {
  id: CreationOptional<string>;
  userId: string;
  riotId: string;
  teamId: string;
  createdAt: CreationOptional<string>;
  updatedAt: CreationOptional<string>;
}

export const Players = sequelize.define<PlayerModel>(
  'players',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'user_id'
    },
    riotId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'riot_id'
    },
    teamId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id'
      },
      field: 'team_id'
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
