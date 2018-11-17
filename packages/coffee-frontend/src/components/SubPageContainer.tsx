import * as React from "react";

import { RouteComponentProps, withRouter } from "react-router";

import { createStyles, withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";

import ProfileButton from "@/components/ProfileButton";

export interface SubContainerProps {
  title?: string;
  back?: boolean;
}

const styles = createStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%"
  },
  appTitle: {
    flexGrow: 1
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

type Props = SubContainerProps &
  StyleProps<typeof styles> &
  RouteComponentProps;

/**
 * Common container for top-level page components.
 */
const SubPageContainer: React.SFC<Props> = ({
  title,
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
        <Typography className={classes.appTitle} variant="h6" color="inherit">
          Coffee
          {title && ` - ${title}`}
        </Typography>
        <ProfileButton />
      </Toolbar>
    </AppBar>
    <div className={classes.content}>{children}</div>
  </div>
);

export default withStyles(styles)(withRouter(SubPageContainer));
