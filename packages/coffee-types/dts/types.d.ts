export interface InventoryItem {
    id: string;
    name: string;
    description?: string;
    sizes?: string[];
    options?: ItemOption[];
}
export declare const InventoryItemSchema = "\n  type InventoryItem {\n    id: String!\n    name: String!\n    description: String\n    sizes: [String!]\n    options: [ItemOption!]\n  }\n  ";
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
export declare type ItemOption = SelectionItemOption | BooleanItemOption | NumericItemOption | TextItemOption;
export declare const ItemOptionSchema = "\n  type ItemOption {\n    id: String!\n    name: String!\n    type: String!\n    description: String\n  }";
