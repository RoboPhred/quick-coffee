import * as React from "react";

import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";

import { TextItemOption } from "@/services/inventory/types";
import { createStyles, withStyles } from "@material-ui/core/styles";

export interface TextOptionProps {
  className?: string;
  option: TextItemOption;
}

const styles = createStyles({
  input: {
    width: "100%"
  }
});

type Props = TextOptionProps & StyleProps<typeof styles>;

const TextOption: React.SFC<Props> = ({ className, classes, option }) => (
  <div className={className}>
    <Typography component="span" variant="body1">
      {option.name}
    </Typography>
    <Input
      className={classes.input}
      defaultValue={option.default}
      placeholder={option.placeholder}
    />
  </div>
);
export default withStyles(styles)(TextOption);
