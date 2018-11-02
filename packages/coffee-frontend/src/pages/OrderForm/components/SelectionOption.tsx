import * as React from "react";

import { createStyles, withStyles } from "@material-ui/core/styles";

import Select from "@material-ui/core/Select";

import { SelectionItemOption } from "@/services/inventory/types";

export interface SelectionOptionProps {
  option: SelectionItemOption;
}

const styles = createStyles({
  select: {
    width: "100%"
  }
});

type Props = SelectionOptionProps & StyleProps<typeof styles>;

const SelectionOption: React.SFC<Props> = ({ classes, option }) => (
  // TODO: Toggle native based on if we are on a phone or not
  <Select className={classes.select} native defaultValue={option.default}>
    {option.choices.map(choice => (
      <option value={choice}>{choice}</option>
    ))}
  </Select>
);
export default withStyles(styles)(SelectionOption);
