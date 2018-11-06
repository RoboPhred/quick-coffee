import { OrderedItem } from "../types";

export interface PostOrderRequest {
  order: {
    itemId: string;
    options: Record<string, number | string | boolean>;
  };
}
export interface PostOrderResponse {
  order: OrderedItem;
}
