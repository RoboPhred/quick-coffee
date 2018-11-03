import * as React from "react";

import { ItemOption } from "@/services/inventory/types";

import SelectionOption from "./SelectionOption";
import BooleanOption from "./BooleanOption";
import TextOption from "./TextOption";
import NumericOption from "./NumericOption";

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
    case "numeric":
      return <NumericOption className={className} option={option} />;
    default:
      return null;
  }
};
export default OptionForm;
