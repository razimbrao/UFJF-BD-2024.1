import { NextFunction, Request, Response, Router } from 'express';
import { CommonRoutesConfig } from './common/routes.config';

const router = Router();
const routes: Array<CommonRoutesConfig> = [];

routes.push();

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
