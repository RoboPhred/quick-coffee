import * as React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";

import { BooleanItemOption } from "@/services/inventory/types";

export interface BooleanOptionProps {
  className?: string;
  option: BooleanItemOption;
}

type Props = BooleanOptionProps;

const BooleanOption: React.SFC<Props> = ({ className, option }) => (
  <div className={className}>
    <Typography component="span" variant="body1">
      {option.name}
    </Typography>
    <Checkbox defaultChecked={option.default} />
  </div>
);
export default BooleanOption;
