import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../datasource';

export interface TodoModel extends Model<InferAttributes<TodoModel>, InferCreationAttributes<TodoModel>> {
  id: CreationOptional<string>;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export const Todos = sequelize.define<TodoModel>(
  'todos',
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
