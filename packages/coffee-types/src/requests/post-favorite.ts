import { JSONSchema6 } from "json-schema";

import { FavoriteItem, OrderOptions, orderOptionsSchema } from "../types";

export interface PostFavoriteRequest {
  favorite: PostFavoriteRequestItem;
}

export interface PostFavoriteResponse {
  favorite: FavoriteItem;
}

export interface PostFavoriteRequestItem {
  itemId: number;
  favoriteName: string;
  options: OrderOptions;
}

export const postFavoriteRequestItemSchema: JSONSchema6 = {
  title: "PostFavoriteRequestItem",
  type: "object",
  properties: {
    itemId: { type: "number", minimum: 1 },
    favoriteName: { type: "string", minLength: 1 },
    options: orderOptionsSchema
  },
  required: ["itemId", "favoriteName", "options"]
};
Object.freeze(postFavoriteRequestItemSchema);

export const postFavoriteRequestSchema: JSONSchema6 = {
  title: "PostFavoriteRequest",
  type: "object",
  properties: {
    favorite: postFavoriteRequestItemSchema
  },
  required: ["favorite"]
};
Object.freeze(postFavoriteRequestSchema);
