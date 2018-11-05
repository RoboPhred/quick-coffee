import { ItemOption } from "./item-option";

export interface ListInventoryItem {
  id: string;
  name: string;
  description?: string;
}

export interface InventoryItem extends ListInventoryItem {
  sizes?: string[];
  options?: ItemOption[];
}
