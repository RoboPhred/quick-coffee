import { OrderedItem } from "../types";
import { Omit } from "../common";

export interface PostOrderRequest {
  order: Omit<OrderedItem, "id">;
}
export interface PostOrderResponse {
  order: OrderedItem;
}
