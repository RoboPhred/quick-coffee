import Router from "koa-router";
import HttpStatusCodes from "http-status-codes";

import { getItems, getItem } from "../data/items";

const router = new Router({ prefix: "/items" });

router.get("/", async (ctx, next) => {
  const items = await getItems();
  ctx.body = items;
  ctx.status = HttpStatusCodes.OK;
  next();
});

router.get("/:itemId", async (ctx, next) => {
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
export default router;
