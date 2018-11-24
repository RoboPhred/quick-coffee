import { OrderOptions } from "./order";

export interface FavoriteItem {
  id: number;
  favoriteName: string;
  itemId: number;
  itemName: string;
  options: OrderOptions;
}
