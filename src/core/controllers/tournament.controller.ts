import { Request, Response } from 'express';
import { Campeonatos } from '../../database/models/Campeonatos';
import { verifyTeamById } from '../services/teams.service';
import { Times, TimesCampeonatos } from '../../database/models/Times';
import { ICampeonatoComTimes } from '../interfaces/Campeonatos';
import { Partidas } from '../../database/models/Partidas';

export const createTournament = async (
  req: Request,
  res: Response
) => {
  const { nome, dataInicio, dataFim } = req.body;

  try {
    const newTournament = await Campeonatos.create({
      nome,
      dataInicio,
      dataFim
    });

    return res.status(201).json(newTournament.dataValues);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro criando torneio',
      error: (error as Error).message
    });
  }
};

export const updateTournament = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { nome, dataInicio, dataFim, vencedor } = req.body;

  try {
    if (vencedor) {
      await verifyTeamById(vencedor);
    }
    const tournament = await Campeonatos.findByPk(id);

    if (!tournament) {
      return res.status(404).send({
        message: 'Torneio não encontrado'
      });
    }

    await tournament.update({
      nome,
      dataInicio,
      dataFim,
      vencedor
    });

    return res.status(200).json(tournament.dataValues);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro atualizando torneio',
      error: (error as Error).message
    });
  }
};

export const deleteTournament = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const tournament = await Campeonatos.findByPk(id);

    if (!tournament) {
      return res.status(404).send({
        message: 'Torneio não encontrado'
      });
    }

    await tournament.destroy();

    return res.status(204).send();
  } catch (error) {
    return res.status(400).send({
      message: 'Erro deletando torneio',
      error: (error as Error).message
    });
  }
};

export const listTournament = async (
  req: Request,
  res: Response
) => {
  try {
    const tournaments = await Campeonatos.findAll();

    return res.status(200).json(tournaments);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro listando torneios',
      error: (error as Error).message
    });
  }
};

export const getTournamentById = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const tournament = await Campeonatos.findByPk(id);

    if (!tournament) {
      return res.status(404).send({
        message: 'Torneio não encontrado'
      });
    }

    return res.status(200).json(tournament);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro buscando torneio',
      error: (error as Error).message
    });
  }
};

export const listTeamByTournament = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const tournament = await Campeonatos.findOne({
      where: { campId: id },
      include: {
        model: Times,
        as: 'times'
      }
    }) as ICampeonatoComTimes;

    if (!tournament) {
      return res.status(404).send({
        message: 'Torneio não encontrado'
      });
    }

    const teams = tournament.teams;

    return res.status(200).json(teams);
  } catch (error) {
    return res.status(400).send({
      message: 'Erro listando times torneio',
      error: (error as Error).message
    });
  }
};

export const addTeamToTournament = async (
  req: Request,
  res: Response
) => {
  const { id: campId } = req.params;
  const { timeId } = req.body;
  try {
    const tournament = await Campeonatos.findByPk(campId);

    if (!tournament) {
      return res.status(404).send({
        message: 'Torneio não encontrado'
      });
    }

    const team = await Times.findByPk(timeId);

    if (!team) {
      return res.status(404).send({
        message: 'Time não encontrado'
      });
    }

    await TimesCampeonatos.create({
      campId: parseInt(campId, 10),
      timeId
    });

    return res.status(204).send();
  } catch (error) {
    return res.status(400).send({
      message: 'Erro adicionando time ao torneio',
      error: (error as Error).message
    });
  }
};

export const listMatchesByTournament = async (
  req: Request,
  res: Response
) => {
  const { id: campId } = req.params;
  try {
    const matches = await Partidas.findAll({
      where: {
        campId
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
