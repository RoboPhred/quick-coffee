import * as React from "react";

import { TextItemOption } from "coffee-types";

import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";

import { createStyles, withStyles } from "@material-ui/core/styles";

export interface TextOptionProps {
  className?: string;
  option: TextItemOption;
  value: string;
  onChange(value: string): void;
}

const styles = createStyles({
  input: {
    width: "100%"
  }
});

type Props = TextOptionProps & StyleProps<typeof styles>;

const TextOption: React.SFC<Props> = ({
  className,
  classes,
  option,
  value,
  onChange
}) => (
  <div className={className}>
    <Typography component="span" variant="body1">
      {option.name}
    </Typography>
    <Input
      className={classes.input}
      value={value || ""}
      placeholder={option.placeholder}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);
export default withStyles(styles)(TextOption);
