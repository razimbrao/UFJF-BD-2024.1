import express from 'express';
import { CommonRoutesConfig } from '../../common/routes.config';
import { verifyBody } from '../middlewares/body.middleware';
import { validateUuid } from '../middlewares/identifier.middleware';
import * as tournamentController from '../controllers/tournament.controller';

export class TournamentRoutes extends CommonRoutesConfig {
  constructor (app: express.Router) {
    super(app, 'tournamentRoutes');
  }

  configureRoutes () {
    this.app
      .route('/tournament')
      .post(
        verifyBody('/tournament'),
        tournamentController.createTournament
      );

    this.app
      .route('/tournament/:id')
      .put(
        validateUuid,
        verifyBody('/tournament'),
        tournamentController.updateTournament
      );

    this.app
      .route('/tournament/:id')
      .delete(
        validateUuid,
        tournamentController.deleteTournament
      );

    this.app
      .route('/tournament')
      .get(
        tournamentController.listTournament
      );

    this.app
      .route('/tournament/:id')
      .get(
        validateUuid,
        tournamentController.getTournamentById
      );

    return this.app;
  }
}
