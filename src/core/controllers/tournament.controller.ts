import { Request, Response } from 'express';
import { Tournaments } from '../../database/models/Tournaments';
import { verifyTeamById } from '../services/teams.service';
import { Teams } from '../../database/models/Teams';
import { ITournamentWithTeams } from '../interfaces/Tournaments';

export const createTournament = async (
  req: Request,
  res: Response
) => {
  const { name, start, end } = req.body;

  try {
    const newTournament = await Tournaments.create({
      name,
      start,
      end
    });

    return res.status(201).json(newTournament.dataValues);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro criando torneio'
    });
  }
};

export const updateTournament = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { name, start, end, winnerTeam } = req.body;

  try {
    await verifyTeamById(winnerTeam);
    const tournament = await Tournaments.findByPk(id);

    if (!tournament) {
      return res.status(404).send({
        message: 'Torneio não encontrado'
      });
    }

    await tournament.update({
      name,
      start,
      end,
      winnerTeam
    });

    return res.status(200).json(tournament.dataValues);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro atualizando torneio'
    });
  }
};

export const deleteTournament = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const tournament = await Tournaments.findByPk(id);

    if (!tournament) {
      return res.status(404).send({
        message: 'Torneio não encontrado'
      });
    }

    await tournament.destroy();

    return res.status(204).send();
  } catch (error) {
    return res.status(400).send({
      message: 'Erro deletando torneio'
    });
  }
};

export const listTournament = async (
  req: Request,
  res: Response
) => {
  try {
    const tournaments = await Tournaments.findAll();

    return res.status(200).json(tournaments);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro listando torneios'
    });
  }
};

export const getTournamentById = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const tournament = await Tournaments.findByPk(id);

    if (!tournament) {
      return res.status(404).send({
        message: 'Torneio não encontrado'
      });
    }

    return res.status(200).json(tournament);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro buscando torneio'
    });
  }
};

export const listTeamByTournament = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const tournament = await Tournaments.findOne({
      where: { id },
      include: {
        model: Teams,
        as: 'teams'
      }
    }) as ITournamentWithTeams;

    if (!tournament) {
      return res.status(404).send({
        message: 'Torneio não encontrado'
      });
    }

    const teams = tournament.teams;

    return res.status(200).json(teams);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro listando times do torneio'
    });
  }
};
