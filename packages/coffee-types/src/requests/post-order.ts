import { OrderedItem } from "../types";

export interface PostOrderRequest {
  order: OrderRequestItem;
}
export interface OrderRequestItem {
  itemId: string;
  options: Record<string, number | string | boolean>;
}
export interface PostOrderResponse {
  order: OrderedItem;
}
