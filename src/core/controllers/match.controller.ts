import { Request, Response } from 'express';
import { Partidas } from '../../database/models/Partidas';
import { verifyTeamTournament } from '../services/teams.service';

export const createMatch = async (
  req: Request,
  res: Response
) => {
  const { campId, timeA, timeB, resultado } = req.body;
  try {
    await verifyTeamTournament(timeA, campId);
    await verifyTeamTournament(timeB, campId);

    const newMatch = await Partidas.create({
      campId,
      timeA,
      timeB,
      resultado
    });

    return res.status(201).json(newMatch.dataValues);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro criando partida',
      error: (error as Error).message
    });
  }
};

export const updateMatch = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { campId, timeA, timeB, resultado } = req.body;

  try {
    await verifyTeamTournament(timeA, campId);
    await verifyTeamTournament(timeB, campId);

    const match = await Partidas.findByPk(id);
    if (!match) {
      return res.status(404).send({
        message: 'Partida não encontrada'
      });
    }

    await match.update({
      campId,
      timeA,
      timeB,
      resultado
    });

    return res.status(200).json(match.dataValues);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro atualizando partida',
      error: (error as Error).message
    });
  }
};

export const deleteMatch = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const match = await Partidas.findByPk(id);
    if (!match) {
      return res.status(404).send({
        message: 'Partida não encontrada'
      });
    }

    await match.destroy();

    return res.status(204).send();
  } catch (error) {
    return res.status(400).send({
      message: 'Erro deletando partida',
      error: (error as Error).message
    });
  }
};

export const getMatchById = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const match = await Partidas.findByPk(id);
    if (!match) {
      return res.status(404).send({
        message: 'Partida não encontrada'
      });
    }

    return res.status(200).json(match.dataValues);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro buscando partida',
      error: (error as Error).message
    });
  }
};

export const listMatch = async (
  req: Request,
  res: Response
) => {
  try {
    const matches = await Partidas.findAll();

    return res.status(200).json(matches);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro listando partidas',
      error: (error as Error).message
    });
  }
};

export const listMatchByTournament = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const matches = await Partidas.findAll({
      where: {
        campId: id
      }
    });

    return res.status(200).json(matches);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro listando partidas',
      error: (error as Error).message
    });
  }
};
