import express from 'express';
import { CommonRoutesConfig } from '../../common/routes.config';
import { verifyBody } from '../middlewares/body.middleware';
import { validateId } from '../middlewares/identifier.middleware';
import * as controller from '../controllers/player.controller';

export class PlayerRoutes extends CommonRoutesConfig {
  constructor (app: express.Router) {
    super(app, 'playerRoutes');
  }

  configureRoutes () {
    this.app
      .route('/player')
      .post(
        verifyBody('/player'),
        controller.createPlayer
      );

    this.app
      .route('/player/:id')
      .put(
        validateId,
        verifyBody('/player'),
        controller.updatePlayer
      );

    this.app
      .route('/player/:id')
      .delete(
        validateId,
        controller.deletePlayer
      );

    this.app
      .route('/teams/:id/player')
      .get(
        validateId,
        controller.listPlayersByTeam
      );

    this.app
      .route('/player/:id')
      .get(
        validateId,
        controller.getPlayerById
      );

    return this.app;
  }
}
