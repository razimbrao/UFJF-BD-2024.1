import { JogadorModel } from '../../database/models/Jogadores';
import { TimeModel } from '../../database/models/Times';

export interface ITeam {
  timeId: number;
  nome: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITimeComJogadores extends TimeModel {
  jogadores: JogadorModel[];
}
