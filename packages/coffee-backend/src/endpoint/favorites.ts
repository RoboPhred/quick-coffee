import Router from "koa-router";
import HttpStatusCodes from "http-status-codes";

import { PostFavoriteRequest } from "coffee-types";

import { authenticate } from "./auth";

import { getFavorites, addFavorite, removeFavorite } from "../data/favorites";

const router = new Router({ prefix: "/favorites" });
router.use(authenticate());

router.get("/", async ctx => {
  const favorites = await getFavorites();
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

  const favorite = await addFavorite(favoriteRequest.favorite);
  ctx.status = HttpStatusCodes.CREATED;
  ctx.body = { favorite };
});

router.del("/:favoriteId", async ctx => {
  const { favoriteId } = ctx.params;
  const isDeleted = await removeFavorite(favoriteId);
  if (isDeleted) {
    ctx.body = { status: "ok" };
    ctx.status = HttpStatusCodes.OK;
  } else {
    ctx.status = HttpStatusCodes.NOT_FOUND;
  }
});

export default router;
