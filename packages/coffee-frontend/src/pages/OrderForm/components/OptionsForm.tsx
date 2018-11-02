import * as React from "react";

import { createStyles, withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import { ItemOption } from "@/services/inventory/types";

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

const OptionsForm: React.SFC<Props> = ({ className, classes, options }) => {
  const elements = options.map(option => (
    <ListItem key={option.name}>
      <OptionForm className={classes.optionForm} option={option} />
    </ListItem>
  ));
  return <List className={className}>{elements}</List>;
};
export default withStyles(styles)(OptionsForm);
