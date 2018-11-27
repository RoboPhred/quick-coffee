import produce from "immer";

import { fromPairs } from "lodash-es";

import { Action } from "redux";

import { AppState, defaultAppState } from "@/state";
import {
  RECEIVE_MENU_BEGIN,
  RECEIVE_MENU_ERROR,
  RECEIVE_MENU_SUCCESS,
  ReceiveMenuSuccessAction,
  ReceiveMenuErrorAction
} from "./actions/receive-menu";
import { InventoryItem } from "coffee-types";

export default function reduceMenu(
  state: AppState = defaultAppState,
  action: Action
): AppState {
  switch (action.type) {
    case RECEIVE_MENU_BEGIN:
      return produce(state, draft => {
        draft.services.menu.isLoading = true;
      });
    case RECEIVE_MENU_ERROR: {
      const recvAction = action as ReceiveMenuErrorAction;
      return produce(state, draft => {
        draft.services.menu.isLoading = false;
        draft.services.menu.errorMessage = recvAction.payload.message;
      });
    }
    case RECEIVE_MENU_SUCCESS: {
      const recvAction = action as ReceiveMenuSuccessAction;
      const { items } = recvAction.payload;
      return produce(state, draft => {
        draft.services.menu.isLoading = false;
        draft.services.menu.errorMessage = null;
        draft.services.menu.itemsById = fromPairs(
          items.map(item => [item.id, item])
        );
        draft.services.menu.itemIds = items.map(x => x.id);
      });
    }
  }

  return state;
}
