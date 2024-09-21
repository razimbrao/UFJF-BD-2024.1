import express from 'express';
import { CommonRoutesConfig } from '../../common/routes.config';
import { verifyBody } from '../middlewares/body.middleware';
import { validateUuid } from '../middlewares/identifier.middleware';
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
        validateUuid,
        verifyBody('/player'),
        controller.updatePlayer
      );

    this.app
      .route('/player/:id')
      .delete(
        validateUuid,
        controller.deletePlayer
      );

    this.app
      .route('/player')
      .get(
        controller.listPlayer
      );

    this.app
      .route('/player/:id')
      .get(
        validateUuid,
        controller.getPlayerById
      );

    return this.app;
  }
}
