"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var item_option_1 = require("./item-option");
exports.InventoryItemSchema = "\n  type InventoryItem {\n    id: String!\n    name: String!\n    description: String\n    sizes: [String!]\n    options: [ItemOption!]\n  }\n  ";
exports.InventoryItemFragment = "\n  id\n  name\n  description\n  sizes\n  options {\n    " + item_option_1.ItemOptionFragment + "\n  }\n";
//# sourceMappingURL=item.js.map