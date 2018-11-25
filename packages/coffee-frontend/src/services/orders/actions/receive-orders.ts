import { OrderedItem } from "coffee-types";

export const RECEIVE_ORDERS_BEGIN = "receive-orders:begin";
export const receiveOrdersBegin = () => ({
  type: RECEIVE_ORDERS_BEGIN as typeof RECEIVE_ORDERS_BEGIN
});
export type ReceiveOrdersBeginAction = ReturnType<typeof receiveOrdersBegin>;

export const RECEIVE_ORDERS_SUCCESS = "receive-orders:success";
export const receiveOrdersSuccess = (orders: OrderedItem[]) => ({
  type: RECEIVE_ORDERS_SUCCESS as typeof RECEIVE_ORDERS_SUCCESS,
  payload: { orders }
});
export type ReceiveOrdersSuccessAction = ReturnType<
  typeof receiveOrdersSuccess
>;

export const RECEIVE_ORDERS_ERROR = "receive-orders:error";
export const receiveOrdersError = (message: string) => ({
  type: RECEIVE_ORDERS_ERROR as typeof RECEIVE_ORDERS_ERROR,
  payload: { message }
});
export type ReceiveOrdersErrorAction = ReturnType<typeof receiveOrdersError>;
