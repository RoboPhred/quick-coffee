import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";

import openRouter from "./open";
import itemsRouter from "./items";

const router = new Router();
router.use(cors());
router.use(bodyParser());

applyRouter(router, openRouter);
applyRouter(router, itemsRouter);

export default router;

function applyRouter(target: Router, router: Router) {
  target.use(router.routes());
  target.use(router.allowedMethods());
}
