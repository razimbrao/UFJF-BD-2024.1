import { Jogadores } from '../../database/models/Jogadores';
import { Times, TimesCampeonatos } from '../../database/models/Times';
import { ITimeComJogadores } from '../interfaces/Times';

export const verifyTeamById = async (teamId: string) => {
  const team = await Times.findByPk(teamId);
  if (!team) {
    throw new Error('Time não encontrado');
  }

  return team;
};

export const verifyTeamSize = async (teamId: string) => {
  const team = await Times.findOne({
    where: { timeId: teamId },
    include: {
      model: Jogadores,
      as: 'jogadores'
    }
  }) as ITimeComJogadores;

  if (!team) {
    throw new Error('Time não encontrado');
  }

  if (team.jogadores.length >= 5) {
    throw new Error('Time já possui 5 jogadores');
  }
};

export const verifyTeamTournament = async (timeId: string, campId: string) => {
  const timeCamp = await TimesCampeonatos.findOne(
    {
      where: { timeId, campId }
    }
  );

  if (!timeCamp) {
    throw new Error('Time não está inscrito nesse campeonato');
  }
};
