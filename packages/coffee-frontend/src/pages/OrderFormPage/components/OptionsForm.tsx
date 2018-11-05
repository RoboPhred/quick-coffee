import * as React from "react";

import { ItemOption } from "coffee-types";

import { createStyles, withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import FormOption from "./FormOption";

export interface OptionsFormProps {
  className?: string;
  options: ItemOption[];
  values: { [option: string]: any };
  onChange(values: { [option: string]: any }): void;
}

const styles = createStyles({
  optionForm: {
    width: "100%"
  }
});

type Props = OptionsFormProps & StyleProps<typeof styles>;
const OptionsForm: React.SFC<Props> = ({
  className,
  classes,
  options,
  values,
  onChange
}) => (
  <List className={className}>
    {options.map(option => (
      <ListItem key={option.name}>
        <FormOption
          value={values[option.id]}
          onChange={value => {
            onChange({
              ...values,
              [option.id]: value
            });
          }}
          className={classes.optionForm}
          option={option}
        />
      </ListItem>
    ))}
  </List>
);

export default withStyles(styles)(OptionsForm);
