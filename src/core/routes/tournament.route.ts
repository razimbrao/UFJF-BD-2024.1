import express from 'express';
import { CommonRoutesConfig } from '../../common/routes.config';
import { verifyBody } from '../middlewares/body.middleware';
import { validateId } from '../middlewares/identifier.middleware';
import * as controller from '../controllers/tournament.controller';

export class TournamentRoutes extends CommonRoutesConfig {
  constructor (app: express.Router) {
    super(app, 'tournamentRoutes');
  }

  configureRoutes () {
    this.app
      .route('/tournament')
      .post(
        verifyBody('/tournament'),
        controller.createTournament
      );

    this.app
      .route('/tournament/:id')
      .put(
        validateId,
        verifyBody('/tournament'),
        controller.updateTournament
      );

    this.app
      .route('/tournament/:id')
      .delete(
        validateId,
        controller.deleteTournament
      );

    this.app
      .route('/tournament')
      .get(
        controller.listTournament
      );

    this.app
      .route('/tournament/:id')
      .get(
        validateId,
        controller.getTournamentById
      );

    this.app
      .route('/tournament/:id/match')
      .get(
        validateId,
        controller.listMatchesByTournament
      );
    return this.app;
  }
}
