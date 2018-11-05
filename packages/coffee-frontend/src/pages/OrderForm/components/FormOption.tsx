import * as React from "react";

import { ItemOption } from "coffee-types";

import SelectionOption from "./SelectionOption";
import BooleanOption from "./BooleanOption";
import TextOption from "./TextOption";
import IntegerOption from "./IntegerOption";

export interface OptionFormProps {
  className?: string;
  option: ItemOption;
  value: any;
  onChange(value: any): void;
}
const FormOption: React.SFC<OptionFormProps> = ({
  className,
  option,
  value,
  onChange
}) => {
  switch (option.type) {
    case "select":
      return (
        <SelectionOption
          className={className}
          option={option}
          value={value}
          onChange={onChange}
        />
      );
    case "boolean":
      return (
        <BooleanOption
          className={className}
          option={option}
          value={value}
          onChange={onChange}
        />
      );
    case "text":
      return (
        <TextOption
          className={className}
          option={option}
          value={value}
          onChange={onChange}
        />
      );
    case "integer":
      return (
        <IntegerOption
          className={className}
          option={option}
          value={value}
          onChange={onChange}
        />
      );
    default:
      return null;
  }
};
export default FormOption;
