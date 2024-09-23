import { TimeModel } from '../../database/models/Times';
import { CampeonatoModel } from '../../database/models/Campeonatos';

export interface ICampeonato {
  campId: number;
  nome: string;
  dataInicio: string;
  dataFim: string;
  vencedor?: number;
}

export interface ICampeonatoComTimes extends CampeonatoModel {
  times: TimeModel[];
}
