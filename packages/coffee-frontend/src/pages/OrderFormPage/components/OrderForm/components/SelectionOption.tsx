import * as React from "react";

import { SelectionItemOption } from "coffee-types";

import { createStyles, withStyles } from "@material-ui/core/styles";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

export interface SelectionOptionProps {
  className?: string;
  option: SelectionItemOption;
  value: string;
  onChange(value: string): void;
}

const styles = createStyles({
  select: {
    width: "100%"
  }
});

type Props = SelectionOptionProps & StyleProps<typeof styles>;

const SelectionOption: React.SFC<Props> = ({
  className,
  classes,
  option,
  value,
  onChange
}) => (
  <div className={className}>
    <Typography variant="body1">{option.name}</Typography>
    <Select
      className={classes.select}
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {option.choices.map(choice => (
        <MenuItem key={choice} value={choice}>
          {choice}
        </MenuItem>
      ))}
    </Select>
  </div>
);
export default withStyles(styles)(SelectionOption);
