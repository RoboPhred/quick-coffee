import { ListInventoryItem, InventoryItem } from "coffee-types";

const items: InventoryItem[] = [
  {
    id: "coffee",
    name: "Coffee",
    description: "Basic unspecified coffee",
    sizes: ["Small", "Medium", "Large"],
    options: [
      {
        id: "creamer",
        name: "Creamer",
        type: "select",
        choices: ["None", "Hazelnut", "French Vanilla"],
        default: "None"
      },
      {
        id: "espresso-shots",
        name: "Espresso Shots",
        type: "integer",
        default: 0
      },
      {
        id: "hot",
        name: "Hot",
        type: "boolean"
      },
      {
        id: "foobar",
        name: "Foobar",
        type: "text",
        placeholder: "This is a placeholder"
      }
    ]
  },
  {
    id: "hot-chocolate",
    name: "Hot Chocolate",
    options: [
      {
        id: "whipped-cream",
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
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
