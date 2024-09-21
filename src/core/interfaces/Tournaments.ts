import { TeamModel } from '../../database/models/Teams';
import { TournamentModel } from '../../database/models/Tournaments';

export interface ITournament {
  id: string;
  name: string;
  start: string;
  end: string;
  winnerTeam?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITournamentWithTeams extends TournamentModel {
  teams: TeamModel[];
}
