import { PlayerModel } from '../../database/models/Players';
import { TeamModel } from '../../database/models/Teams';

export interface ITeam {
  id: string;
  name: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITeamWithPlayers extends TeamModel {
  players: PlayerModel[];
}
