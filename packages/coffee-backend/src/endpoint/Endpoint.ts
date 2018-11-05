import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";

import HttpStatusCodes from "http-status-codes";

import { getItems, getItem } from "../items";

export default class Endpoint {
  private _app: Koa | undefined;

  start(): void {
    this._app = new Koa();
    this._app.use(cors());
    this._app.use(bodyParser());

    const router = new Router();
    applyRouter(this._app, router);

    router.get("/open", (ctx, next) => {
      ctx.body = {
        open: true
      };
      next();
    });

    router.get("/items", async (ctx, next) => {
      const items = await getItems();
      ctx.body = items;
      ctx.status = HttpStatusCodes.OK;
      next();
    });

    router.get("/items/:itemId", async (ctx, next) => {
      const { itemId } = ctx.params;
      try {
        const item = await getItem(itemId);
        ctx.body = item;
        ctx.status = HttpStatusCodes.OK;
      } catch (e) {
        if (e.code === "ITEM_NOT_FOUND") {
          ctx.status = HttpStatusCodes.NOT_FOUND;
        }
      }
      next();
    });

    this._app.listen(4000);
  }
}

function applyRouter(app: Koa, router: Router) {
  app.use(router.routes());
  app.use(router.allowedMethods());
}
