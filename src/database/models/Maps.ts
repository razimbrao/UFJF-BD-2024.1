import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../datasource';
import { Matches } from './Matches';
import { Locations } from './Locations';

export interface MapModel extends Model<InferAttributes<MapModel>, InferCreationAttributes<MapModel>> {
  id: CreationOptional<string>;
  matchId: string;
  locationId: string;
  result: string;
  createdAt: CreationOptional<string>;
  updatedAt: CreationOptional<string>;
}

export const Maps = sequelize.define<MapModel>(
  'maps',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
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
    locationId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'locations',
        key: 'id'
      },
      field: 'location_id'
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

Matches.hasMany(Maps, { foreignKey: 'matchId' });
Maps.belongsTo(Matches, { foreignKey: 'matchId' });

Locations.hasMany(Maps, { foreignKey: 'locationId' });
Maps.belongsTo(Locations, { foreignKey: 'locationId' });
