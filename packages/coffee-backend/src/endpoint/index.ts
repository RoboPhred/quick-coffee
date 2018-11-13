import Router from "koa-router";
import bodyParser from "koa-bodyparser";

import authRouter, { passport } from "./auth";

import openRouter from "./open";
import itemsRouter from "./items";
import ordersRouter from "./orders";
import favoritesRouter from "./favorites";

const apiRouter = new Router();
apiRouter.use(
  bodyParser({
    enableTypes: ["json"]
  })
);

apiRouter.use(passport.initialize());
apiRouter.use(passport.session());

applyRouter(apiRouter, authRouter);
applyRouter(apiRouter, openRouter);
applyRouter(apiRouter, itemsRouter);
applyRouter(apiRouter, ordersRouter);
applyRouter(apiRouter, favoritesRouter);

export default apiRouter;

function applyRouter(target: Router, router: Router) {
  target.use(router.routes());
  target.use(router.allowedMethods());
}
