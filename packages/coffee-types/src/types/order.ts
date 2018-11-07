export interface ListOrderedItem {
  id: string;
  itemId: string;
  itemName: string;
  dateOrdered: string;
  status: "pending" | "in-progress" | "ready";
}

export interface OrderedItem extends ListOrderedItem {
  options: Record<string, string | number | boolean>;
}
