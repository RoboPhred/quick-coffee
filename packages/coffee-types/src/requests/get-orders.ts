import { OrderedItem } from "../types";

export interface GetOrdersRequest {}
export interface GetOrdersResponse {
  orders: OrderedItem[];
}
