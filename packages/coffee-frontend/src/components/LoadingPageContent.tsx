import * as React from "react";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: 2 * theme.spacing.unit
    }
  });

type Props = StyleProps<typeof styles>;
const LoadingPageContent: React.SFC<Props> = ({ classes }) => (
  <div className={classes.root}>
    <Typography variant="h6" component="div">
      Loading
    </Typography>
    <CircularProgress />
  </div>
);
export default withStyles(styles)(LoadingPageContent);
