import { JSONSchema6 } from "json-schema";

import { OrderOptions, orderOptionsSchema } from "./order";

export interface FavoriteItem {
  id: number;
  favoriteName: string;
  itemId: number;
  itemName: string;
  options: OrderOptions;
}
export const favoriteItemSchema: JSONSchema6 = {
  title: "FavoriteItem",
  type: "object",
  properties: {
    id: { type: "number", minimum: 1 },
    favoriteName: { type: "string", minLength: 1 },
    itemId: { type: "number", minimum: 1 },
    itemName: { type: "string", minLength: 1 },
    options: orderOptionsSchema
  }
};
Object.freeze(favoriteItemSchema);
