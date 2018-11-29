import { InventoryItemRequest, InventoryItem } from "coffee-types";

import { AsyncActionBehavior } from "@/async-action-behavior";

export const ADD_MENU_ITEM = "add-menu-item";
export const addMenuItem = (
  item: InventoryItemRequest,
  asyncBehavior?: AsyncActionBehavior
) => ({
  type: ADD_MENU_ITEM as typeof ADD_MENU_ITEM,
  payload: { item },
  meta: { asyncBehavior }
});
export type AddMenuItemAction = ReturnType<typeof addMenuItem>;

export const ADD_MENU_ITEM_SUCCESS = "add-menu-item:success";
export const addMenuItemSuccess = (item: InventoryItem) => ({
  type: ADD_MENU_ITEM_SUCCESS as typeof ADD_MENU_ITEM_SUCCESS,
  payload: { item }
});
export type AddMenuItemSuccessAction = ReturnType<typeof addMenuItemSuccess>;
