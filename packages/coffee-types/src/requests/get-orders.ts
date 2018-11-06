import { ListOrderedItem } from "../types";

export interface GetOrdersRequest {}
export interface GetOrdersResponse {
  orders: ListOrderedItem[];
}
