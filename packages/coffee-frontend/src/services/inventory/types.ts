export interface InventoryItem {
  id: string;
  name: string;
  description?: string;
  options?: ItemOption[];
}

export interface ItemOptionBase {
  name: string;
  type: string;
  description?: string;
}
export interface SelectionItemOption extends ItemOptionBase {
  type: "select";
  choices: string[];
  default?: string;
}
export interface BooleanItemOption extends ItemOptionBase {
  type: "boolean";
  default?: boolean;
}
export interface NumericItemOption extends ItemOptionBase {
  type: "numeric";
  default?: number;
}
export interface TextItemOption extends ItemOptionBase {
  type: "text";
  default?: string;
  placeholder?: string;
}

export type ItemOption =
  | SelectionItemOption
  | BooleanItemOption
  | NumericItemOption
  | TextItemOption;
