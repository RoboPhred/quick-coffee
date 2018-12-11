import Router from "koa-router";

import { injectable, provides, singleton } from "microinject";

import Controller from "../contracts/Controller";

import authRouter, { passport } from "./auth";
import baristaRouter from "./barista";

@injectable()
@provides(Controller)
@singleton()
export default class LegacyController implements Controller {
  getRouter(): Router {
    const apiRouter = new Router();

    apiRouter.use(passport.initialize());
    apiRouter.use(passport.session());

    applyRouter(apiRouter, authRouter);
    applyRouter(apiRouter, baristaRouter);

    return apiRouter;
  }
}

function applyRouter(target: Router, router: Router) {
  target.use(router.routes());
  target.use(router.allowedMethods());
}
