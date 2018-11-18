import * as React from "react";

import { createStyles, withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import ProfileButton from "@/components/ProfileButton";

export interface ContainerProps {
  title?: string;
  leftIcon?: JSX.Element;
  navigation?: JSX.Element;
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

type Props = ContainerProps & StyleProps<typeof styles>;

/**
 * Common container for top-level page components.
 */
const Container: React.SFC<Props> = ({
  title,
  leftIcon,
  navigation,
  classes,
  children
}) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        {leftIcon}
        <Typography className={classes.appTitle} variant="h6" color="inherit">
          Coffee
          {title && ` - ${title}`}
        </Typography>
        <ProfileButton />
      </Toolbar>
    </AppBar>
    <div className={classes.content}>{children}</div>
    {navigation}
  </div>
);

export default withStyles(styles)(Container);
