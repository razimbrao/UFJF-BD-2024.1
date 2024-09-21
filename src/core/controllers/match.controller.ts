import { Request, Response } from 'express';
import { Matches } from '../../database/models/Matches';
import { verifyTeamById } from '../services/teams.service';
import { verifyTournamentById } from '../services/tournaments.service';

export const createMatch = async (
  req: Request,
  res: Response
) => {
  const { tournamentId, teamA, teamB, result } = req.body;
  try {
    await verifyTeamById(teamA);
    await verifyTeamById(teamB);
    await verifyTournamentById(tournamentId);

    const newMatch = await Matches.create({
      tournamentId,
      teamA,
      teamB,
      result
    });

    return res.status(201).json(newMatch.dataValues);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro criando partida'
    });
  }
};

export const updateMatch = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { tournamentId, teamA, teamB, result } = req.body;

  try {
    await verifyTeamById(teamA);
    await verifyTeamById(teamB);
    await verifyTournamentById(tournamentId);

    const match = await Matches.findByPk(id);
    if (!match) {
      return res.status(404).send({
        message: 'Partida não encontrada'
      });
    }

    await match.update({
      tournamentId,
      teamA,
      teamB,
      result
    });

    return res.status(200).json(match.dataValues);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro atualizando partida'
    });
  }
};

export const deleteMatch = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const match = await Matches.findByPk(id);
    if (!match) {
      return res.status(404).send({
        message: 'Partida não encontrada'
      });
    }

    await match.destroy();

    return res.status(204).send();
  } catch (error) {
    return res.status(400).send({
      message: 'Erro deletando partida'
    });
  }
};

export const getMatchById = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const match = await Matches.findByPk(id);
    if (!match) {
      return res.status(404).send({
        message: 'Partida não encontrada'
      });
    }

    return res.status(200).json(match.dataValues);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro buscando partida'
    });
  }
};

export const listMatch = async (
  req: Request,
  res: Response
) => {
  try {
    const matches = await Matches.findAll();

    return res.status(200).json(matches);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro listando partidas'
    });
  }
};
