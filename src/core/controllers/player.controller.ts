import { Request, Response } from 'express';
import { Jogadores } from '../../database/models/Jogadores';
import { verifyUserById } from '../services/users.service';
import { verifyTeamSize } from '../services/teams.service';

export const createPlayer = async (
  req: Request,
  res: Response
) => {
  const { usuarioId, riotId, timeId } = req.body;

  try {
    await verifyUserById(usuarioId);
    await verifyTeamSize(timeId);

    const newPlayer = await Jogadores.create({
      usuarioId,
      riotId,
      timeId
    });

    return res.status(201).json(newPlayer.dataValues);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro criando jogador',
      error: (error as Error).message
    });
  }
};

export const updatePlayer = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { usuarioId, riotId, timeId } = req.body;

  try {
    await verifyUserById(usuarioId);
    await verifyTeamSize(timeId);

    const player = await Jogadores.findByPk(id);

    if (!player) {
      return res.status(404).send({
        message: 'Jogador não encontrado'
      });
    }

    await player.update({
      usuarioId,
      riotId,
      timeId
    });

    return res.status(200).json(player.dataValues);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro atualizando jogador',
      error: (error as Error).message
    });
  }
};

export const deletePlayer = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const player = await Jogadores.findByPk(id);

    if (!player) {
      return res.status(404).send({
        message: 'Jogador não encontrado'
      });
    }

    await player.destroy();

    return res.status(204).send();
  } catch (error) {
    return res.status(400).send({
      message: 'Erro deletando jogador',
      error: (error as Error).message
    });
  }
};

export const getPlayerById = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const player = await Jogadores.findByPk(id);

    if (!player) {
      return res.status(404).send({
        message: 'Jogador não encontrado'
      });
    }

    return res.status(200).json(player);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro buscando jogador',
      error: (error as Error).message
    });
  }
};

export const listPlayersByTeam = async (
  req: Request,
  res: Response
) => {
  const { id: timeId } = req.params;

  try {
    const players = await Jogadores.findAll({
      where: {
        timeId
      }
    });

    return res.status(200).json(players);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro listando jogadores',
      error: (error as Error).message
    });
  }
};
