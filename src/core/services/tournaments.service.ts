import { Tournaments } from '../../database/models/Tournaments';

export const verifyTournamentById = async (tournamentId: string) => {
  const tournament = await Tournaments.findByPk(tournamentId);
  if (!tournament) {
    throw new Error('Time não encontrado');
  }

  return tournament;
};
