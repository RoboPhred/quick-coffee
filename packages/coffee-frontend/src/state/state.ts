import {
  FavoritesServiceState,
  defaultFavoritesServieState
} from "@/services/favorites/state";

import {
  OrdersServiceState,
  defaultOrdersServiceState
} from "@/services/orders/state";

import { RouterState } from "connected-react-router";

export interface AppState {
  router: RouterState;
  services: {
    favorites: FavoritesServiceState;
    orders: OrdersServiceState;
  };
}
export const defaultAppState: Readonly<AppState> = Object.freeze({
  router: undefined as any, // Initialized by connected-react-router
  services: {
    favorites: defaultFavoritesServieState,
    orders: defaultOrdersServiceState
  }
});
