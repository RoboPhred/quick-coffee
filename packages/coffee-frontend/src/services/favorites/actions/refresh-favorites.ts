export const REFRESH_FAVORITES = "refresh-favorites";
export const refreshFavorites = () => ({
  type: REFRESH_FAVORITES as typeof REFRESH_FAVORITES
});
export type RefreshFavoritesAction = ReturnType<typeof refreshFavorites>;
