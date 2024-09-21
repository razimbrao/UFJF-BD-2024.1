import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../datasource';

export interface LocationModel extends Model<InferAttributes<LocationModel>, InferCreationAttributes<LocationModel>> {
  id: CreationOptional<string>;
  name: string;
  status: boolean;
  createdAt: CreationOptional<string>;
  updatedAt: CreationOptional<string>;
}

export const Locations = sequelize.define<LocationModel>(
  'locations',
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
    status: {
      type: DataTypes.BOOLEAN,
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
