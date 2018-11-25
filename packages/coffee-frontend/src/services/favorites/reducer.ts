import produce from "immer";

import { findIndex } from "lodash-es";

import { Action } from "redux";

import { AppState, defaultAppState } from "@/state";

import {
  RECEIVE_FAVORITES_BEGIN,
  RECEIVE_FAVORITES_SUCCESS,
  RECEIVE_FAVORITES_ERROR,
  ReceiveFavoritesSuccessAction,
  ReceiveFavoritesErrorAction
} from "./actions/receive-favorites";

import {
  ADD_FAVORITE_SUCCESS,
  AddFavoriteSuccessAction
} from "./actions/add-favorite";
import {
  DELETE_FAVORITE_SUCCESS,
  DeleteFavoriteSuccessAction
} from "./actions/delete-favorite";

export default function reduceFavorites(
  state: AppState = defaultAppState,
  action: Action
): AppState {
  switch (action.type) {
    case RECEIVE_FAVORITES_BEGIN: {
      return produce(state, draft => {
        draft.services.favorites.isLoading = true;
        draft.services.favorites.errorMessage = null;
      });
    }
    case RECEIVE_FAVORITES_SUCCESS: {
      const recvAction = action as ReceiveFavoritesSuccessAction;
      return produce(state, draft => {
        draft.services.favorites = {
          isLoading: false,
          errorMessage: null,
          favorites: recvAction.payload.favorites
        };
      });
    }
    case RECEIVE_FAVORITES_ERROR: {
      const recvAction = action as ReceiveFavoritesErrorAction;
      return produce(state, draft => {
        draft.services.favorites.isLoading = false;
        draft.services.favorites.errorMessage = recvAction.payload.message;
      });
    }
    case ADD_FAVORITE_SUCCESS: {
      const addAction = action as AddFavoriteSuccessAction;
      return produce(state, draft => {
        draft.services.favorites.favorites = [
          ...(draft.services.favorites.favorites || []),
          addAction.payload.favorite
        ];
      });
    }
    case DELETE_FAVORITE_SUCCESS: {
      const deleteAction = action as DeleteFavoriteSuccessAction;
      const { favoriteId } = deleteAction.payload;
      const { favorites } = state.services.favorites;
      if (favorites == null) {
        return state;
      }
      const index = findIndex(favorites, x => x.id === favoriteId);
      if (index === -1) {
        return state;
      }
      return produce(state, draft => {
        draft.services.favorites.favorites!.splice(index, 1);
      });
    }
  }

  return state;
}
