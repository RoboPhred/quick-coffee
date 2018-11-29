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

import {
  ADD_MENU_ITEM_SUCCESS,
  AddMenuItemSuccessAction
} from "./actions/add-menu-item";

import {
  DELETE_MENU_ITEM_SUCCESS,
  DeleteMenuItemSuccessAction
} from "./actions/delete-menu-item";

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
    case ADD_MENU_ITEM_SUCCESS: {
      const addAction = action as AddMenuItemSuccessAction;
      const { item } = addAction.payload;
      return produce(state, draft => {
        const { menu } = draft.services;

        if (menu.itemIds == null) {
          menu.itemIds = [];
        }
        menu.itemIds.push(item.id);

        if (menu.itemsById == null) {
          menu.itemsById = {};
        }
        menu.itemsById[item.id] = item;
      });
    }
    case DELETE_MENU_ITEM_SUCCESS: {
      const deleteAction = action as DeleteMenuItemSuccessAction;
      const { itemId } = deleteAction.payload;
      let { itemsById, itemIds } = state.services.menu;
      if (itemsById == null || itemIds == null) {
        return state;
      }

      const idx = itemIds.indexOf(itemId);
      if (idx !== -1) {
        itemIds = [...itemIds];
        itemIds.splice(idx, 1);
      }

      itemsById = { ...itemsById };
      delete itemsById[itemId];

      return produce(state, draft => {
        draft.services.menu = {
          ...draft.services.menu,
          itemIds,
          itemsById
        };
      });
    }
  }

  return state;
}
