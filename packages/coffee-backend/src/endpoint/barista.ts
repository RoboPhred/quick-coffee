import Router from "koa-router";

import HttpStatusCodes from "http-status-codes";

import { authenticate } from "./auth";
import { getAllOrders } from "../data/orders";

const router = new Router({ prefix: "/barista" });
router.use(authenticate("barista"));

router.get("/orders", async ctx => {
  const allOrders = await getAllOrders();
  ctx.body = {
    orders: allOrders
  };
  ctx.status = HttpStatusCodes.OK;
});

export default router;
