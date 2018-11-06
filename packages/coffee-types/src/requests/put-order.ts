import { OrderedItem } from "../types";
import { Omit } from "../common";

export interface PutOrderRequest {
  order: Omit<OrderedItem, "id">;
}
export interface PutOrderResponse {
  order: OrderedItem;
}
