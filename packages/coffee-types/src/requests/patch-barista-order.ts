import { OrderStatus, OrderedItem } from "../types";

export interface PatchBaristaOrderRequest {
  status?: OrderStatus;
}

export interface PatchBaristaOrderResult {
  order: OrderedItem;
}
