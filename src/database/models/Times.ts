import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../datasource';
import { Campeonatos } from './Campeonatos';
import { Partidas } from './Partidas';
import { Jogadores } from './Jogadores';

export interface TimeModel extends Model<InferAttributes<TimeModel>, InferCreationAttributes<TimeModel>> {
  timeId: CreationOptional<number>;
  nome: string;
  logo: string;
}

export interface TimesCampeonatosModel extends Model<InferAttributes<TimesCampeonatosModel>, InferCreationAttributes<TimesCampeonatosModel>> {
  timeId: number;
  campId: number;
}

export interface TimesPartidasModel extends Model<InferAttributes<TimesPartidasModel>, InferCreationAttributes<TimesPartidasModel>> {
  timeId: number;
  partidaId: number;
}

export const Times = sequelize.define<TimeModel>(
  'time',
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
    }
  },
  {
    tableName: 'time',
    timestamps: false
  }
);

export const TimesCampeonatos = sequelize.define<TimesCampeonatosModel>(
  'time_campeonato',
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
    }
  },
  {
    tableName: 'time_campeonato',
    timestamps: false
  }
);

export const TimesPartidas = sequelize.define<TimesPartidasModel>(
  'time_partida',
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
    }
  },
  {
    tableName: 'time_partida',
    timestamps: false
  }
);

Times.belongsToMany(Campeonatos, { through: TimesCampeonatos, foreignKey: 'timeId' });
Campeonatos.belongsToMany(Times, { through: TimesCampeonatos, foreignKey: 'campId' });

Times.belongsToMany(Partidas, { through: TimesPartidas, foreignKey: 'timeId' });
Partidas.belongsToMany(Times, { through: TimesPartidas, foreignKey: 'partidaId' });

Times.hasMany(Jogadores, { foreignKey: 'timeId' });
Jogadores.belongsTo(Times, { foreignKey: 'timeId' });
