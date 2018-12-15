import { InventoryItemRequest, InventoryItem } from "coffee-types";

import { AsyncActionBehavior } from "@/async-action-behavior";

export const UPDATE_MENU_ITEM = "update-menu-item";
export const updateMenuItem = (
  item: InventoryItemRequest,
  asyncBehavior?: AsyncActionBehavior
) => ({
  type: UPDATE_MENU_ITEM as typeof UPDATE_MENU_ITEM,
  payload: { item },
  meta: { asyncBehavior }
});
export type UpdateMenuItemAction = ReturnType<typeof updateMenuItem>;

export const UPDATE_MENU_ITEM_SUCCESS = "update-menu-item:success";
export const updateMenuItemSuccess = (item: InventoryItem) => ({
  type: UPDATE_MENU_ITEM_SUCCESS as typeof UPDATE_MENU_ITEM_SUCCESS,
  payload: { item }
});
export type UpdateMenuItemSuccessAction = ReturnType<
  typeof updateMenuItemSuccess
>;
