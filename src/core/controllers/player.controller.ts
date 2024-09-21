import { Request, Response } from 'express';
import { Players } from '../../database/models/Players';

export const createPlayer = async (
  req: Request,
  res: Response
) => {
  const { userId, riotId, teamId } = req.body;

  try {
    const newPlayer = await Players.create({
      userId,
      riotId,
      teamId
    });

    return res.status(201).json(newPlayer.dataValues);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro criando jogador'
    });
  }
};

export const updatePlayer = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { userId, riotId, teamId } = req.body;

  try {
    const player = await Players.findByPk(id);

    if (!player) {
      return res.status(404).send({
        message: 'Jogador não encontrado'
      });
    }

    await player.update({
      userId,
      riotId,
      teamId
    });

    return res.status(200).json(player.dataValues);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro atualizando jogador'
    });
  }
};

export const deletePlayer = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const player = await Players.findByPk(id);

    if (!player) {
      return res.status(404).send({
        message: 'Jogador não encontrado'
      });
    }

    await player.destroy();

    return res.status(204).send();
  } catch (error) {
    return res.status(400).send({
      message: 'Erro deletando jogador'
    });
  }
};

export const listPlayer = async (
  req: Request,
  res: Response
) => {
  try {
    const players = await Players.findAll();

    return res.status(200).json(players);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro listando jogadores'
    });
  }
};

export const getPlayerById = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const player = await Players.findByPk(id);

    if (!player) {
      return res.status(404).send({
        message: 'Jogador não encontrado'
      });
    }

    return res.status(200).json(player);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro buscando jogador'
    });
  }
};
