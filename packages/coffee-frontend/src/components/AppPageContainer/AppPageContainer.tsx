import * as React from "react";

import { RouteComponentProps, withRouter } from "react-router";

import { createStyles, withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";

import AppBottomNavigation from "./components/BottomNavigation";

export interface AppContainerProps {
  title?: string;
  navigation?: boolean;
  back?: boolean;
}

const styles = createStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%"
  },
  backButton: {
    marginLeft: -12,
    marginRight: 20
  },
  content: {
    flexGrow: 1,
    minHeight: 0,
    width: "100%",
    height: "100%"
  }
});

type Props = AppContainerProps &
  StyleProps<typeof styles> &
  RouteComponentProps;

/**
 * Common container for top-level page components.
 */
const AppPageContainer: React.SFC<Props> = ({
  title,
  navigation,
  back,
  classes,
  children,
  history
}) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        {back && (
          <IconButton
            className={classes.backButton}
            color="inherit"
            aria-label="Back"
            onClick={() => history.goBack()}
          >
            <ArrowBack />
          </IconButton>
        )}
        <Typography variant="h6" color="inherit">
          Coffee
          {title && ` - ${title}`}
        </Typography>
      </Toolbar>
    </AppBar>
    <div className={classes.content}>{children}</div>
    {navigation && (
      <div>
        <AppBottomNavigation />
      </div>
    )}
  </div>
);

export default withStyles(styles)(withRouter(AppPageContainer));
