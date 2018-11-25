import Router from "koa-router";
import HttpStatusCodes from "http-status-codes";

import MenuItem from "../models/MenuItem";

const router = new Router({ prefix: "/items" });

router.get("/", async ctx => {
  const items = await MenuItem.getAll();
  ctx.body = items;
  ctx.status = HttpStatusCodes.OK;
});

router.get("/:itemId", async ctx => {
  const { itemId } = ctx.params;
  try {
    const item = await MenuItem.findById(itemId);
    ctx.body = item;
    ctx.status = HttpStatusCodes.OK;
  } catch (e) {
    if (e.code === "ITEM_NOT_FOUND") {
      ctx.status = HttpStatusCodes.NOT_FOUND;
    }
  }
});
export default router;
