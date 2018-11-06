import Router from "koa-router";
import bodyParser from "koa-bodyparser";

import openRouter from "./open";
import itemsRouter from "./items";
import ordersRouter from "./orders";

const apiRouter = new Router();
apiRouter.use(
  bodyParser({
    enableTypes: ["json"]
  })
);

applyRouter(apiRouter, openRouter);
applyRouter(apiRouter, itemsRouter);
applyRouter(apiRouter, ordersRouter);

export default apiRouter;

function applyRouter(target: Router, router: Router) {
  target.use(router.routes());
  target.use(router.allowedMethods());
}
