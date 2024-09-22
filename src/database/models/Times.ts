import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../datasource';
import { Campeonatos } from './Campeonatos';
import { Partidas } from './Partidas';
import { Jogadores } from './Jogadores';

export interface TimeModel extends Model<InferAttributes<TimeModel>, InferCreationAttributes<TimeModel>> {
  timeId: CreationOptional<number>;
  nome: string;
  logo: string;
  createdAt: CreationOptional<string>;
  updatedAt: CreationOptional<string>;
}

export interface TimesCampeonatosModel extends Model<InferAttributes<TimesCampeonatosModel>, InferCreationAttributes<TimesCampeonatosModel>> {
  timeId: number;
  campId: number;
  createdAt: CreationOptional<string>;
  updatedAt: CreationOptional<string>;
}

export interface TimesPartidasModel extends Model<InferAttributes<TimesPartidasModel>, InferCreationAttributes<TimesPartidasModel>> {
  timeId: number;
  partidaId: number;
  createdAt: CreationOptional<string>;
  updatedAt: CreationOptional<string>;
}

export const Times = sequelize.define<TimeModel>(
  'times',
  {
    timeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'time_id'
    },
    nome: {
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

export const TimesCampeonatos = sequelize.define<TimesCampeonatosModel>(
  'times_campeonatos',
  {
    timeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'times',
        key: 'time_id'
      },
      field: 'time_id'
    },
    campId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'campeonatos',
        key: 'camp_id'
      },
      field: 'camp_id'
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

export const TimesPartidas = sequelize.define<TimesPartidasModel>(
  'times_partidas',
  {
    timeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'times',
        key: 'time_id'
      },
      field: 'time_id'
    },
    partidaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'partidas',
        key: 'partida_id'
      },
      field: 'partida_id'
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

Times.belongsToMany(Campeonatos, { through: TimesCampeonatos, foreignKey: 'timeId' });
Campeonatos.belongsToMany(Times, { through: TimesCampeonatos, foreignKey: 'campId' });

Times.belongsToMany(Partidas, { through: TimesPartidas, foreignKey: 'timeId' });
Partidas.belongsToMany(Times, { through: TimesPartidas, foreignKey: 'partidaId' });

Times.hasMany(Jogadores, { foreignKey: 'timeId' });
Jogadores.belongsTo(Times, { foreignKey: 'timeId' });
