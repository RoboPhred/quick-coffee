import { OrderedItem, OrderOptions, orderOptionsSchema } from "../types";
import { JSONSchema6 } from "json-schema";

export interface PostOrderRequest {
  order: OrderRequestItem;
}
export interface PostOrderResponse {
  order: OrderedItem;
}

export interface OrderRequestItem {
  itemId: number;
  options: OrderOptions;
}
export const orderRequestItemSchema: JSONSchema6 = {
  title: "OrderRequestItem",
  type: "object",
  properties: {
    itemId: { type: "number", minimum: 1 },
    options: orderOptionsSchema
  },
  required: ["itemId", "options"]
};
Object.freeze(orderRequestItemSchema);

export const postOrderRequestSchema: JSONSchema6 = {
  title: "PostOrderRequest",
  type: "object",
  properties: {
    order: orderRequestItemSchema
  }
};
Object.freeze(postOrderRequestSchema);
