"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemOptionSchema = "\n  union ItemOptionDefault = String | Boolean | Int\n  type ItemOption {\n    id: String!\n    name: String!\n    type: String!\n    description: String\n    choices: [String]\n    default: ItemOptionDefault\n    placeholder: String\n  }";
exports.ItemOptionFragment = "\n  id\n  name\n  type\n  description\n  choices\n  default\n  placeholder\n";
//# sourceMappingURL=item-option.js.map