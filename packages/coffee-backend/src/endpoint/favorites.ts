import Router from "koa-router";
import HttpStatusCodes from "http-status-codes";

import { PostFavoriteRequest } from "coffee-types";

import { authenticate } from "./auth";

import Favorite from "../models/Favorite";

const router = new Router({ prefix: "/favorites" });
router.use(authenticate());

router.get("/", async ctx => {
  const favorites = await Favorite.getByUserId(ctx.state.user.id);
  ctx.body = { favorites };
  ctx.status = HttpStatusCodes.OK;
});

router.post("/", async ctx => {
  const favoriteRequest: PostFavoriteRequest = ctx.request.body as any;
  if (
    !favoriteRequest ||
    typeof favoriteRequest !== "object" ||
    !favoriteRequest.favorite
  ) {
    ctx.status = HttpStatusCodes.BAD_REQUEST;
    return;
  }

  const partialFavorite = favoriteRequest.favorite;
  const favorite = await Favorite.create(
    ctx.state.user.id,
    partialFavorite.itemId,
    partialFavorite.favoriteName
  );
  ctx.status = HttpStatusCodes.CREATED;
  ctx.body = { favorite };
});

router.del("/:favoriteId", async ctx => {
  const { favoriteId } = ctx.params;
  const isDeleted = await Favorite.delete(favoriteId, ctx.state.user.id);
  if (isDeleted) {
    ctx.body = { status: "ok" };
    ctx.status = HttpStatusCodes.OK;
  } else {
    ctx.status = HttpStatusCodes.NOT_FOUND;
  }
});

export default router;
