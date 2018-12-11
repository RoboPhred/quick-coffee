import { AsyncActionBehavior } from "@/async-action-behavior";

export const DELETE_MENU_ITEM = "delete-menu-item";
export const deleteMenuItem = (
  itemId: number,
  asyncBehavior?: AsyncActionBehavior
) => ({
  type: DELETE_MENU_ITEM as typeof DELETE_MENU_ITEM,
  payload: { itemId },
  meta: { asyncBehavior }
});
export type DeleteMenuItemAction = ReturnType<typeof deleteMenuItem>;

export const DELETE_MENU_ITEM_SUCCESS = "delete-menu-item:success";
export const deleteMenuItemSuccess = (itemId: number) => ({
  type: DELETE_MENU_ITEM_SUCCESS as typeof DELETE_MENU_ITEM_SUCCESS,
  payload: { itemId }
});
export type DeleteMenuItemSuccessAction = ReturnType<
  typeof deleteMenuItemSuccess
>;
