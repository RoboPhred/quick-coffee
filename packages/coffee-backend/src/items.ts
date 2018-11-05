import { ListInventoryItem, InventoryItem } from "coffee-types";

const items: InventoryItem[] = [
  {
    id: "coffee",
    name: "Coffee",
    description: "Basic unspecified coffee",
    sizes: ["Small", "Medium", "Large"],
    options: [
      {
        name: "Creamer",
        type: "select",
        choices: ["None", "Hazelnut", "French Vanilla"],
        default: "None"
      },
      {
        name: "Expresso Shots",
        type: "integer",
        default: 0
      },
      {
        name: "Hot",
        type: "boolean"
      },
      {
        name: "Foobar",
        type: "text"
      }
    ]
  },
  {
    id: "hot-chocolate",
    name: "Hot Chocolate",
    options: [
      {
        name: "Whipped Cream",
        type: "boolean",
        default: true
      }
    ]
  }
];

export async function getItems(): Promise<ListInventoryItem[]> {
  return items.map(x => ({
    ...x,
    sizes: undefined,
    options: undefined
  }));
}

export async function getItem(itemId: string): Promise<InventoryItem> {
  const item = items.find(x => x.id === itemId);
  if (!item) {
    throw new ItemNotFoundError();
  }

  return item;
}

export class ItemNotFoundError extends Error {
  code = "ITEM_NOT_FOUND";

  constructor() {
    super("Item Not Found.");
    Object.setPrototypeOf(this, ItemNotFoundError);
  }
}
