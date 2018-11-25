export const DELETE_FAVORITE = "delete-favorite";
export const deleteFavorite = (favoriteId: number) => ({
  type: DELETE_FAVORITE as typeof DELETE_FAVORITE,
  payload: { favoriteId }
});
export type DeleteFavoriteAction = ReturnType<typeof deleteFavorite>;

export const DELETE_FAVORITE_SUCCESS = "delete-favorite:success";
export const deleteFavoriteSuccess = (favoriteId: number) => ({
  type: DELETE_FAVORITE_SUCCESS as typeof DELETE_FAVORITE_SUCCESS,
  payload: { favoriteId }
});
export type DeleteFavoriteSuccessAction = ReturnType<
  typeof deleteFavoriteSuccess
>;
