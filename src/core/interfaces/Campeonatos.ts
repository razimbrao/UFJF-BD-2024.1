import { TimeModel } from '../../database/models/Times';
import { CampeonatoModel } from '../../database/models/Campeonatos';

export interface ICampeonato {
  campId: number;
  nome: string;
  dataInicio: string;
  dataFim: string;
  vencedor?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICampeonatoComTimes extends CampeonatoModel {
  teams: TimeModel[];
}
