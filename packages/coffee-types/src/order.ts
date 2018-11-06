export interface ListOrderedItem {
  id: string;
  itemId: string;
  itemName: string;
}

export interface OrderedItem extends ListOrderedItem {
  options: Record<string, string | number | boolean>;
}
