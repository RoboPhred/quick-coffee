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

export const ItemOptionSchema = `
  union ItemOptionDefault = String | Boolean | Int
  type ItemOption {
    id: String!
    name: String!
    type: String!
    description: String
    choices: [String]
    default: ItemOptionDefault
    placeholder: String
  }`;
export const ItemOptionFragment = `
  id
  name
  type
  description
  choices
  default
  placeholder
`;
