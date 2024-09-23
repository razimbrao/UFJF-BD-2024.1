import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../datasource';

export interface UsuarioModel extends Model<InferAttributes<UsuarioModel>, InferCreationAttributes<UsuarioModel>> {
  usuarioId: CreationOptional<number>;
  email: string;
  senha: string;
  nome: string;
}

export const Usuarios = sequelize.define<UsuarioModel>(
  'usuario',
  {
    usuarioId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'usuario_id'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'usuario',
    timestamps: false
  }
);
