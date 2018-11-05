import { ItemOption } from "./item-option";
export interface InventoryItem {
    id: string;
    name: string;
    description?: string;
    sizes?: string[];
    options?: ItemOption[];
}
export declare const InventoryItemSchema = "\n  type InventoryItem {\n    id: String!\n    name: String!\n    description: String\n    sizes: [String!]\n    options: [ItemOption!]\n  }\n  ";
export declare const InventoryItemFragment: string;
