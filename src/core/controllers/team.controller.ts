import { Request, Response } from 'express';
import { Teams } from '../../database/models/Teams';

export const createTeam = async (
  req: Request,
  res: Response
) => {
  const { name, logo } = req.body;

  try {
    const newTeam = await Teams.create({
      name,
      logo
    });

    return res.status(201).json(newTeam.dataValues);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro criando time'
    });
  }
};

export const updateTeam = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { name, logo } = req.body;

  try {
    const team = await Teams.findByPk(id);

    if (!team) {
      return res.status(404).send({
        message: 'Time não encontrado'
      });
    }

    await team.update({
      name,
      logo
    });

    return res.status(200).json(team.dataValues);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro atualizando time'
    });
  }
};

export const deleteTeam = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const team = await Teams.findByPk(id);

    if (!team) {
      return res.status(404).send({
        message: 'Time não encontrado'
      });
    }

    await team.destroy();

    return res.status(200).json(team.dataValues);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro deletando time'
    });
  }
};

export const getTeamById = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const team = await Teams.findByPk(id);

    if (!team) {
      return res.status(404).send({
        message: 'Time não encontrado'
      });
    }

    return res.status(200).json(team.dataValues);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro buscando time'
    });
  }
};

export const listTeam = async (
  req: Request,
  res: Response
) => {
  try {
    const teams = await Teams.findAll();

    return res.status(200).json(teams);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro listando times'
    });
  }
};
