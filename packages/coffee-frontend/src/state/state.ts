import {
  FavoritesServiceState,
  defaultFavoritesServieState
} from "@/services/favorites/state";

import { RouterState } from "connected-react-router";

export interface AppState {
  router: RouterState;
  services: {
    favorites: FavoritesServiceState;
  };
}
export const defaultAppState: Readonly<AppState> = Object.freeze({
  router: null as any, // Initialized by connected-react-router
  services: {
    favorites: defaultFavoritesServieState
  }
});
