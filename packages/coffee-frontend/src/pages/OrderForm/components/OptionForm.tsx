import * as React from "react";

import { ItemOption } from "@/services/inventory/types";

import Typography from "@material-ui/core/Typography";

import SelectionOption from "./SelectionOption";

export interface OptionFormProps {
  className?: string;
  option: ItemOption;
}
const OptionForm: React.SFC<OptionFormProps> = ({ className, option }) => {
  let optionWidget: React.ReactNode | null = null;
  switch (option.type) {
    case "select":
      optionWidget = <SelectionOption option={option} />;
  }

  return (
    <div className={className}>
      <Typography variant="body1">{option.name}</Typography>
      {optionWidget}
    </div>
  );
};
export default OptionForm;
