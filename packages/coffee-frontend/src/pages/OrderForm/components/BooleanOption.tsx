import * as React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { BooleanItemOption } from "@/services/inventory/types";

export interface BooleanOptionProps {
  className?: string;
  option: BooleanItemOption;
}

type Props = BooleanOptionProps;

const BooleanOption: React.SFC<Props> = ({ className, option }) => (
  <FormControlLabel
    className={className}
    control={<Checkbox defaultChecked={option.default} />}
    label={option.name}
  />
);
export default BooleanOption;
