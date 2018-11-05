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

export interface IntegerItemOption extends ItemOptionBase {
  type: "integer";
  default?: number;
}

export interface TextItemOption extends ItemOptionBase {
  type: "text";
  placeholder?: string;
  default?: string;
}

export type ItemOption =
  | SelectionItemOption
  | BooleanItemOption
  | IntegerItemOption
  | TextItemOption;
