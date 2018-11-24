import { ItemOption } from "./item-option";

export interface InventoryItem {
  id: number;
  name: string;
  description?: string;
  options?: ItemOption[];
}
