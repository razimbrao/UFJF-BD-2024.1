import { Campeonatos } from '../../database/models/Campeonatos';

export const verifyTournamentById = async (tournamentId: string) => {
  const tournament = await Campeonatos.findByPk(tournamentId);
  if (!tournament) {
    throw new Error('Time não encontrado');
  }

  return tournament;
};
