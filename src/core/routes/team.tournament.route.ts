import express from 'express';
import { CommonRoutesConfig } from '../../common/routes.config';
import { verifyBody } from '../middlewares/body.middleware';
import { validateId } from '../middlewares/identifier.middleware';
import * as controller from '../controllers/tournament.controller';

export class TeamTournamentRoutes extends CommonRoutesConfig {
  constructor (app: express.Router) {
    super(app, 'teamTournamentRoutes');
  }

  configureRoutes () {
    this.app
      .route('/tournament/:id/team')
      .get(
        validateId,
        controller.listTeamByTournament
      );

    this.app
      .route('/tournament/:id/team')
      .post(
        validateId,
        verifyBody('/time/campeonato'),
        controller.addTeamToTournament
      );
    return this.app;
  }
}
