import { ItemOption, ItemOptionFragment } from "./item-option";

export interface InventoryItem {
  id: string;
  name: string;
  description?: string;
  sizes?: string[];
  options?: ItemOption[];
}
export const InventoryItemSchema = `
  type InventoryItem {
    id: String!
    name: String!
    description: String
    sizes: [String!]
    options: [ItemOption!]
  }
  `;
export const InventoryItemFragment = `
  id
  name
  description
  sizes
  options {
    ${ItemOptionFragment}
  }
`;
