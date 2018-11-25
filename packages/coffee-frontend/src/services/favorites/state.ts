import { FavoriteItem } from "coffee-types";

export interface FavoritesServiceState {
  isLoading: boolean;
  errorMessage: string | null;
  favorites: FavoriteItem[] | null;
}
export const defaultFavoritesServieState: FavoritesServiceState = Object.freeze(
  {
    isLoading: false,
    errorMessage: null,
    favorites: null
  }
);
