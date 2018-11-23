import Router from "koa-router";

import { PatchBaristaOrderRequest } from "coffee-types";

import HttpStatusCodes from "http-status-codes";

import Order from "../models/Order";

import { authenticate } from "./auth";

const router = new Router({ prefix: "/barista" });
router.use(authenticate("barista"));

router.get("/orders", async ctx => {
  const allOrders = await Order.getAll();
  ctx.body = {
    orders: allOrders
  };
  ctx.status = HttpStatusCodes.OK;
});

router.patch("/orders/:orderId", async ctx => {
  const { orderId } = ctx.params;
  if (!orderId) {
    ctx.status = HttpStatusCodes.BAD_REQUEST;
    return;
  }

  const body = ctx.request.body;
  if (body == null || typeof body !== "object") {
    ctx.status = HttpStatusCodes.BAD_REQUEST;
    return;
  }

  const { status } = body as PatchBaristaOrderRequest;
  if (status) {
    await Order.setStatus(orderId, status);
  }

  ctx.status = HttpStatusCodes.OK;
  ctx.body = Order.getById(orderId);
});

export default router;
