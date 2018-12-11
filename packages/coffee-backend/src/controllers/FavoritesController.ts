import { injectable, provides, inject, singleton } from "microinject";

import HttpStatusCodes from "http-status-codes";

import {
  PostFavoriteRequest,
  postFavoriteRequestSchema,
  PostFavoriteResponse,
  GetFavoritesResponse,
  DeleteFavoriteResponse
} from "coffee-types";

import Validator from "../services/Validator";

import Controller, {
  get,
  user,
  HttpError,
  post,
  body,
  del,
  param,
  authorize
} from "../contracts/Controller";

import User from "../models/User";
import Favorite from "../models/Favorite";

@injectable()
@provides(Controller)
@singleton()
export default class FavoritesController {
  constructor(@inject(Validator) private _validator: Validator) {}

  @get("/favorites")
  @authorize()
  async getFavorites(@user() user: User): Promise<GetFavoritesResponse> {
    const favorites = await Favorite.getByUserId(user.id);
    return { favorites };
  }

  @post("/favorites")
  @authorize()
  async createFavorite(
    @user() user: User,
    @body() body: PostFavoriteRequest
  ): Promise<PostFavoriteResponse> {
    if (!this._validator.validate(body, postFavoriteRequestSchema)) {
      throw new HttpError(HttpStatusCodes.BAD_REQUEST, "Bad Request.");
    }

    const partialFavorite = body.favorite;
    const favorite = await Favorite.create(
      user.id,
      partialFavorite.itemId,
      partialFavorite.favoriteName,
      partialFavorite.options
    );

    if (!favorite) {
      throw new HttpError(
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
        "Interal Server Error."
      );
    }

    return { favorite };
  }

  @del("/favorites/:favoriteId")
  @authorize()
  async deleteFavorite(
    @user() user: User,
    @param("favoriteId") favoriteIdParam: string
  ): Promise<DeleteFavoriteResponse> {
    const favoriteId = Number(favoriteIdParam);
    if (isNaN(favoriteId)) {
      throw new HttpError(HttpStatusCodes.NOT_FOUND, "Favorite Not Found.");
    }

    const deleted = await Favorite.delete(favoriteId, user.id);
    if (!deleted) {
      throw new HttpError(HttpStatusCodes.NOT_FOUND, "Favorite Not Found.");
    }

    return { status: "ok" };
  }
}
