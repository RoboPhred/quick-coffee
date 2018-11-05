import * as React from "react";

import { IntegerItemOption } from "coffee-types";

import { createStyles, withStyles, Theme } from "@material-ui/core/styles";

import Button, { ButtonProps } from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export interface IntegerOptionProps {
  className?: string;
  option: IntegerItemOption;
}

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: "flex"
    },
    button: {
      margin: theme.spacing.unit
    },
    value: {
      alignSelf: "center"
    }
  });

type Props = IntegerOptionProps & StyleProps<ReturnType<typeof styles>>;

const IntegerOption: React.SFC<Props> = ({ className, classes, option }) => (
  <div className={className}>
    <Typography component="span" variant="body1">
      {option.name}
    </Typography>
    <div className={classes.container}>
      <NumericOptionButton className={classes.button} aria-label="Decrement">
        -
      </NumericOptionButton>
      <Typography className={classes.value} component="span" variant="h5">
        12
      </Typography>
      <NumericOptionButton className={classes.button} aria-label="Increment">
        +
      </NumericOptionButton>
    </div>
  </div>
);
export default withStyles(styles)(IntegerOption);

const NumericOptionButton: React.SFC<ButtonProps> = ({ ...props }) => (
  <Button variant="fab" color="secondary" mini {...props} />
);
