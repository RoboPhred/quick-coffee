import { InventoryItem } from "coffee-types";

export const RECEIVE_MENU_BEGIN = "receive-menu:begin";
export const receiveMenuBegin = () => ({
  type: RECEIVE_MENU_BEGIN as typeof RECEIVE_MENU_BEGIN
});
export type ReceiveMenuBeginAction = ReturnType<typeof receiveMenuBegin>;

export const RECEIVE_MENU_SUCCESS = "receive-menu:success";
export const receiveMenuSuccess = (items: InventoryItem[]) => ({
  type: RECEIVE_MENU_SUCCESS as typeof RECEIVE_MENU_SUCCESS,
  payload: { items }
});
export type ReceiveMenuSuccessAction = ReturnType<typeof receiveMenuSuccess>;

export const RECEIVE_MENU_ERROR = "receive-menu:error";
export const receiveMenuError = (message: string) => ({
  type: RECEIVE_MENU_ERROR as typeof RECEIVE_MENU_ERROR,
  payload: { message }
});
export type ReceiveMenuErrorAction = ReturnType<typeof receiveMenuError>;
