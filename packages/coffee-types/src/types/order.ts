export interface OrderedItem {
  id: string;
  itemId: string;
  itemName: string;
  dateOrdered: string;
  status: "pending" | "in-progress" | "ready";
}
