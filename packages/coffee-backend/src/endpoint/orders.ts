import Router from "koa-router";
import HttpStatusCodes from "http-status-codes";

import { PostOrderRequest } from "coffee-types";

import { authenticate } from "./auth";

import { getOrdersByUser, addOrder } from "../data/orders";

const router = new Router({ prefix: "/orders" });
router.use(authenticate());

router.get("/", async ctx => {
  const orders = await getOrdersByUser(ctx.state.user);
  ctx.body = { orders };
  ctx.status = HttpStatusCodes.OK;
});

router.post("/", async ctx => {
  const orderRequest: PostOrderRequest = ctx.request.body as any;
  if (
    !orderRequest ||
    typeof orderRequest !== "object" ||
    !orderRequest.order
  ) {
    ctx.status = HttpStatusCodes.BAD_REQUEST;
    return;
  }

  const order = await addOrder(orderRequest.order, ctx.state.user);
  ctx.status = HttpStatusCodes.CREATED;
  ctx.body = { order };
});

export default router;
