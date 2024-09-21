import express from 'express';
import { CommonRoutesConfig } from '../../common/routes.config';
import { verifyBody } from '../middlewares/body.middleware';
import { validateUuid } from '../middlewares/identifier.middleware';
import * as controller from '../controllers/match.controller';

export class MatchRoutes extends CommonRoutesConfig {
  constructor (app: express.Router) {
    super(app, 'matchRoutes');
  }

  configureRoutes () {
    this.app
      .route('/match')
      .post(
        verifyBody('/match'),
        controller.createMatch
      );

    this.app
      .route('/match/:id')
      .put(
        validateUuid,
        verifyBody('/match'),
        controller.updateMatch
      );

    this.app
      .route('/match/:id')
      .delete(
        validateUuid,
        controller.deleteMatch
      );

    this.app
      .route('/tournament/:id/match')
      .get(
        validateUuid,
        controller.listMatchByTournament
      );

    this.app
      .route('/match/:id')
      .get(
        validateUuid,
        controller.getMatchById
      );

    return this.app;
  }
}
