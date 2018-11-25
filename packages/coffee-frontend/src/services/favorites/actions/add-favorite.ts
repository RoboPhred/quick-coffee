import { FavoriteRequestItem, FavoriteItem } from "coffee-types";

export const ADD_FAVORITE = "add-favorite";
export const addFavorite = (favorite: FavoriteRequestItem) => ({
  type: ADD_FAVORITE as typeof ADD_FAVORITE,
  payload: { favorite }
});
export type AddFavoriteAction = ReturnType<typeof addFavorite>;

export const ADD_FAVORITE_SUCCESS = "add-favorite:success";
export const addFavoriteSuccess = (favorite: FavoriteItem) => ({
  type: ADD_FAVORITE_SUCCESS as typeof ADD_FAVORITE_SUCCESS,
  payload: { favorite }
});
export type AddFavoriteSuccessAction = ReturnType<typeof addFavoriteSuccess>;
