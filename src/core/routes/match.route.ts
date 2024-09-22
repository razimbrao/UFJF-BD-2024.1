import express from 'express';
import { CommonRoutesConfig } from '../../common/routes.config';
import { verifyBody } from '../middlewares/body.middleware';
import { validateId } from '../middlewares/identifier.middleware';
import * as controller from '../controllers/match.controller';

export class MatchRoutes extends CommonRoutesConfig {
  constructor (app: express.Router) {
    super(app, 'matchRoutes');
  }

  configureRoutes () {
    this.app
      .route('/match')
      .post(
        verifyBody('/partida'),
        controller.createMatch
      );

    this.app
      .route('/match/:id')
      .put(
        validateId,
        verifyBody('/partida'),
        controller.updateMatch
      );

    this.app
      .route('/match/:id')
      .delete(
        validateId,
        controller.deleteMatch
      );

    this.app
      .route('/tournament/:id/match')
      .get(
        validateId,
        controller.listMatchByTournament
      );

    this.app
      .route('/match/:id')
      .get(
        validateId,
        controller.getMatchById
      );

    return this.app;
  }
}
