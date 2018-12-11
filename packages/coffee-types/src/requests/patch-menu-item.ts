import { Omit } from "../common";
import { InventoryItem } from "../types";

export interface PatchMenuItemRequest {
  item: Partial<Omit<InventoryItem, "id">>
}
export interface PatchMenuItemResponse {
  item: InventoryItem;
}