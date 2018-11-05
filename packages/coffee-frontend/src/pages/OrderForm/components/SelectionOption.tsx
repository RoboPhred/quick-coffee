import * as React from "react";

import { SelectionItemOption } from "coffee-types";

import { createStyles, withStyles } from "@material-ui/core/styles";

import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";

export interface SelectionOptionProps {
  className?: string;
  option: SelectionItemOption;
}

const styles = createStyles({
  select: {
    width: "100%"
  }
});

type Props = SelectionOptionProps & StyleProps<typeof styles>;

const SelectionOption: React.SFC<Props> = ({ className, classes, option }) => (
  // TODO: Toggle native based on if we are on a phone or not
  <div className={className}>
    <Typography variant="body1">{option.name}</Typography>
    <Select className={classes.select} native defaultValue={option.default}>
      {option.choices.map(choice => (
        <option value={choice}>{choice}</option>
      ))}
    </Select>
  </div>
);
export default withStyles(styles)(SelectionOption);
