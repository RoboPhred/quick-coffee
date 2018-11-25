import Router from "koa-router";
import HttpStatusCodes from "http-status-codes";

import { PostOrderRequest } from "coffee-types";

import { authenticate } from "./auth";

import Order from "../models/Order";

const router = new Router({ prefix: "/orders" });
router.use(authenticate());

router.get("/", async ctx => {
  const orders = await Order.getByUserId(ctx.state.user.id);
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

  const { itemId, options } = orderRequest.order;
  const order = await Order.create(ctx.state.user.id, itemId, options);
  if (order == null) {
    ctx.status = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    return;
  }

  ctx.status = HttpStatusCodes.CREATED;
  ctx.body = { order };
});

export default router;
