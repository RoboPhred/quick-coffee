import Router from "koa-router";

import {
  PatchBaristaOrderRequest,
  PostMenuItemRequest,
  PatchMenuItemRequest
} from "coffee-types";

import HttpStatusCodes from "http-status-codes";

import Order from "../models/Order";

import { authenticate } from "./auth";
import MenuItem from "../models/MenuItem";

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

router.post("/menu-items", async ctx => {
  const body = ctx.request.body as PostMenuItemRequest;
  if (body == null || typeof body !== "object") {
    ctx.status = HttpStatusCodes.BAD_REQUEST;
    return;
  }
  const { item } = body;
  const menuItem = await MenuItem.create(item.name, item.description);
  if (menuItem == null) {
    ctx.status = HttpStatusCodes.BAD_REQUEST;
    return;
  }

  ctx.status = HttpStatusCodes.OK;
  ctx.body = { item: menuItem };
});

router.patch("/menu-items/:itemId", async ctx => {
  const { itemId } = ctx.params;
  if (!itemId) {
    ctx.status = HttpStatusCodes.BAD_REQUEST;
    return;
  }

  const body = ctx.request.body;
  if (body == null || typeof body !== "object") {
    ctx.status = HttpStatusCodes.BAD_REQUEST;
    return;
  }

  const { item } = body as PatchMenuItemRequest;
  const resultItem = await MenuItem.update(itemId, item);

  if (resultItem === null) {
    ctx.status = HttpStatusCodes.NOT_FOUND;
  } else {
    ctx.status = HttpStatusCodes.OK;
    ctx.body = { item: resultItem };
  }
});

router.delete("/menu-items/:itemId", async ctx => {
  const { itemId } = ctx.params;
  if (!itemId) {
    ctx.status = HttpStatusCodes.BAD_REQUEST;
    return;
  }

  const status = await MenuItem.delete(itemId);
  if (status == false) {
    ctx.status = HttpStatusCodes.NOT_FOUND;
  } else {
    ctx.status = HttpStatusCodes.OK;
    ctx.body = { status: "ok" };
  }
});

export default router;
