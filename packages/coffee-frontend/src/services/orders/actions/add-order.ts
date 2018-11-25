import { OrderRequestItem, OrderedItem } from "coffee-types";

export const ADD_ORDER = "add-order";
export const addOrder = (order: OrderRequestItem) => ({
  type: ADD_ORDER as typeof ADD_ORDER,
  payload: { order }
});
export type AddOrderAction = ReturnType<typeof addOrder>;

export const ADD_ORDER_SUCCESS = "add-order:success";
export const addOrderSuccess = (order: OrderedItem) => ({
  type: ADD_ORDER_SUCCESS as typeof ADD_ORDER_SUCCESS,
  payload: { order }
});
export type AddOrderSuccessAction = ReturnType<typeof addOrderSuccess>;
