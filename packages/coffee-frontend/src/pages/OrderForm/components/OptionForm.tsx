import * as React from "react";

import { ItemOption } from "coffee-types";

import SelectionOption from "./SelectionOption";
import BooleanOption from "./BooleanOption";
import TextOption from "./TextOption";
import IntegerOption from "./IntegerOption";

export interface OptionFormProps {
  className?: string;
  option: ItemOption;
}
const OptionForm: React.SFC<OptionFormProps> = ({ className, option }) => {
  switch (option.type) {
    case "select":
      return <SelectionOption className={className} option={option} />;
    case "boolean":
      return <BooleanOption className={className} option={option} />;
    case "text":
      return <TextOption className={className} option={option} />;
    case "integer":
      return <IntegerOption className={className} option={option} />;
    default:
      return null;
  }
};
export default OptionForm;
