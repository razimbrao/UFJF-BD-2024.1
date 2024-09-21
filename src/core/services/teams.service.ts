import { Players } from '../../database/models/Players';
import { Teams } from '../../database/models/Teams';
import { ITeamWithPlayers } from '../interfaces/Teams';

export const verifyTeamById = async (teamId: string) => {
  const team = await Teams.findByPk(teamId);
  if (!team) {
    throw new Error('Time não encontrado');
  }

  return team;
};

export const verifyTeamSize = async (teamId: string) => {
  const team = await Teams.findOne({
    where: { id: teamId },
    include: {
      model: Players,
      as: 'players'
    }
  }) as ITeamWithPlayers;

  if (!team) {
    throw new Error('Time não encontrado');
  }

  if (team.players.length >= 5) {
    throw new Error('Time já possui 5 jogadores');
  }
};
