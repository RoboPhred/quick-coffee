import * as React from "react";

import { createStyles, withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export interface AppContainerProps {
  title: string;
}

const styles = createStyles({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flexGrow: 1,
    minWidth: 0,
    width: "100%"
  }
});

type Props = AppContainerProps & StyleProps<typeof styles>;

/**
 * Common container for top-level page components.
 */
const AppPageContainer: React.SFC<Props> = ({ title, classes, children }) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
    <div className={classes.content}>{children}</div>
  </div>
);

export default withStyles(styles)(AppPageContainer);
