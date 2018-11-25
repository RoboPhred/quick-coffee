import { FavoriteItem } from "coffee-types";

export const RECEIVE_FAVORITES_BEGIN = "receive-favorites:begin";
export const receiveFavoritesBegin = () => ({
  type: RECEIVE_FAVORITES_BEGIN as typeof RECEIVE_FAVORITES_BEGIN
});
export type ReceiveFavoritesBeginAction = ReturnType<
  typeof receiveFavoritesBegin
>;

export const RECEIVE_FAVORITES_SUCCESS = "receive-favorites:success";
export const receiveFavoritesSuccess = (favorites: FavoriteItem[]) => ({
  type: RECEIVE_FAVORITES_SUCCESS as typeof RECEIVE_FAVORITES_SUCCESS,
  payload: { favorites }
});
export type ReceiveFavoritesSuccessAction = ReturnType<
  typeof receiveFavoritesSuccess
>;

export const RECEIVE_FAVORITES_ERROR = "receive-favorites:error";
export const receiveFavoritesError = (message: string) => ({
  type: RECEIVE_FAVORITES_ERROR as typeof RECEIVE_FAVORITES_ERROR,
  payload: { message }
});
export type ReceiveFavoritesErrorAction = ReturnType<
  typeof receiveFavoritesError
>;
