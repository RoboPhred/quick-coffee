import Router from "koa-router";
import HttpStatusCodes from "http-status-codes";

import { injectable, provides } from "microinject";

import Controller from "../contracts/Controller";

import MenuItem from "../models/MenuItem";
import { get } from "../contracts/Controller";

@injectable()
@provides(Controller)
export default class MenuItemsController implements Controller {
  getRouter() {
    const router = new Router({ prefix: "/items" });

    router.get("/", async ctx => {
      const items = await MenuItem.getAll();
      ctx.body = items;
      ctx.status = HttpStatusCodes.OK;
    });

    router.get("/:itemId", async ctx => {
      const { itemId } = ctx.params;
      try {
        const item = await MenuItem.getById(itemId);
        ctx.body = item;
        ctx.status = HttpStatusCodes.OK;
      } catch (e) {
        if (e.code === "ITEM_NOT_FOUND") {
          ctx.status = HttpStatusCodes.NOT_FOUND;
        }
      }
    });
    return router;
  }
}
