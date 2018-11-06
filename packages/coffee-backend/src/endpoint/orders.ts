import Router from "koa-router";
import HttpStatusCodes from "http-status-codes";

import { PostOrderRequest } from "coffee-types";

import { getOrders, addOrder } from "../data/orders";

const router = new Router({ prefix: "/orders" });

router.get("/", async (ctx, next) => {
  const orders = await getOrders();
  ctx.body = { orders };
  ctx.status = HttpStatusCodes.OK;
  next();
});

router.post("/", async (ctx, next) => {
  const orderRequest: PostOrderRequest = ctx.request.body as any;
  if (
    !orderRequest ||
    typeof orderRequest !== "object" ||
    !orderRequest.order
  ) {
    ctx.status = HttpStatusCodes.BAD_REQUEST;
    next();
    return;
  }

  const order = addOrder(orderRequest.order);
  ctx.status = HttpStatusCodes.CREATED;
  ctx.body = { order };
  next();
});
