import { Request, Response } from 'express';
import { Times } from '../../database/models/Times';

export const createTeam = async (
  req: Request,
  res: Response
) => {
  const { nome, logo } = req.body;

  try {
    const newTeam = await Times.create({
      nome,
      logo
    });

    return res.status(201).json(newTeam.dataValues);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro criando time',
      error: (error as Error).message
    });
  }
};

export const updateTeam = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { nome, logo } = req.body;

  try {
    const team = await Times.findByPk(id);

    if (!team) {
      return res.status(404).send({
        message: 'Time não encontrado'
      });
    }

    await team.update({
      nome,
      logo
    });

    return res.status(200).json(team.dataValues);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro atualizando time',
      error: (error as Error).message
    });
  }
};

export const deleteTeam = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const team = await Times.findByPk(id);

    if (!team) {
      return res.status(404).send({
        message: 'Time não encontrado'
      });
    }

    await team.destroy();

    return res.status(200).json(team.dataValues);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro deletando time',
      error: (error as Error).message
    });
  }
};

export const getTeamById = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const team = await Times.findByPk(id);

    if (!team) {
      return res.status(404).send({
        message: 'Time não encontrado'
      });
    }

    return res.status(200).json(team.dataValues);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro buscando time',
      error: (error as Error).message
    });
  }
};

export const listTeam = async (
  req: Request,
  res: Response
) => {
  try {
    const teams = await Times.findAll();

    return res.status(200).json(teams);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro listando times',
      error: (error as Error).message
    });
  }
};
