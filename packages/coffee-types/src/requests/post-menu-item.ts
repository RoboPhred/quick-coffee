import { InventoryItem } from "../types";

export interface PostMenuItemRequest {
  item: InventoryItemRequest;
}
export interface InventoryItemRequest {
  name: string;
  description?: string;
}
export interface PostMenuItemResponse {
  item: InventoryItem;
}
