import * as React from "react";

import { ItemOption } from "coffee-types";

import { createStyles, withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import OptionForm from "./OptionForm";

export interface OptionsFormProps {
  className?: string;
  options: ItemOption[];
}

const styles = createStyles({
  optionForm: {
    width: "100%"
  }
});

type Props = OptionsFormProps & StyleProps<typeof styles>;

const OptionsForm: React.SFC<Props> = ({ className, classes, options }) => (
  <List className={className}>
    {options.map(option => (
      <ListItem key={option.name}>
        <OptionForm className={classes.optionForm} option={option} />
      </ListItem>
    ))}
  </List>
);
export default withStyles(styles)(OptionsForm);
