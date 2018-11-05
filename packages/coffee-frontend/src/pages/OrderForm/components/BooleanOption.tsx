import * as React from "react";

import { BooleanItemOption } from "coffee-types";

import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";

export interface BooleanOptionProps {
  className?: string;
  option: BooleanItemOption;
  value: boolean;
  onChange(value: boolean): void;
}

type Props = BooleanOptionProps;

const BooleanOption: React.SFC<Props> = ({
  className,
  option,
  value,
  onChange
}) => (
  <div className={className}>
    <Typography component="span" variant="body1">
      {option.name}
    </Typography>
    <Checkbox checked={value} onChange={e => onChange(e.target.checked)} />
  </div>
);
export default BooleanOption;
