import express from 'express';
import { CommonRoutesConfig } from '../../common/routes.config';
import { verifyBody } from '../middlewares/body.middleware';
import { validateId } from '../middlewares/identifier.middleware';
import * as controller from '../controllers/team.controller';

export class TeamRoutes extends CommonRoutesConfig {
  constructor (app: express.Router) {
    super(app, 'teamRoutes');
  }

  configureRoutes () {
    this.app
      .route('/team')
      .post(
        verifyBody('/team'),
        controller.createTeam
      );

    this.app
      .route('/team/:id')
      .put(
        validateId,
        verifyBody('/team'),
        controller.updateTeam
      );

    this.app
      .route('/team/:id')
      .delete(
        validateId,
        controller.deleteTeam
      );

    this.app
      .route('/team')
      .get(
        controller.listTeam
      );

    this.app
      .route('/team/:id')
      .get(
        validateId,
        controller.getTeamById
      );

    return this.app;
  }
}
