import { NextFunction, Request, Response, Router } from 'express';
import { CommonRoutesConfig } from './common/routes.config';
import { TournamentRoutes } from './core/routes/tournament.route';
import { PlayerRoutes } from './core/routes/player.route';
import { TeamRoutes } from './core/routes/team.route';
import { MatchRoutes } from './core/routes/match.route';
import { TeamTournamentRoutes } from './core/routes/team.tournament.route';

const router = Router();
const routes: Array<CommonRoutesConfig> = [];

routes.push(new TournamentRoutes(router));
routes.push(new PlayerRoutes(router));
routes.push(new TeamRoutes(router));
routes.push(new MatchRoutes(router));
routes.push(new TeamTournamentRoutes(router));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const httpRequest = {
    status: error.name,
    requestUrl: req.url,
    requestMethod: req.method
  };
});

export default router;
