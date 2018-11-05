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
export declare type ItemOption = SelectionItemOption | BooleanItemOption | IntegerItemOption | TextItemOption;
export declare const ItemOptionSchema = "\n  union ItemOptionDefault = String | Boolean | Int\n  type ItemOption {\n    id: String!\n    name: String!\n    type: String!\n    description: String\n    choices: [String]\n    default: ItemOptionDefault\n    placeholder: String\n  }";
export declare const ItemOptionFragment = "\n  id\n  name\n  type\n  description\n  choices\n  default\n  placeholder\n";
