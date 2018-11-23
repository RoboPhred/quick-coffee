import { OrderedItem, OrderOptions } from "../types";

export interface PostOrderRequest {
  order: OrderRequestItem;
}
export interface OrderRequestItem {
  itemId: number;
  options: OrderOptions;
}
export interface PostOrderResponse {
  order: OrderedItem;
}
