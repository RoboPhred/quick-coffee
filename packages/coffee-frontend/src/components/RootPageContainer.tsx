import * as React from "react";

import { autobind } from "core-decorators";

import { createStyles, withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/icons/Menu";

import AppDrawer from "@/components/AppDrawer";
import BottomNavigation from "@/components/BottomNavigation";
import ProfileButton from "@/components/ProfileButton";

export interface RootPageContainerProps {
  title?: string;
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
  menuButton: {
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

type Props = RootPageContainerProps & StyleProps<typeof styles>;
interface State {
  isAppDrawerOpen: boolean;
}
/**
 * Common container for top-level page components.
 */
class RootPageContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isAppDrawerOpen: false
    };
  }

  render() {
    const { title, classes, children } = this.props;
    const { isAppDrawerOpen } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              className={classes.menuButton}
              onClick={this._onAppDrawerOpen}
            >
              <Menu />
            </IconButton>
            <Typography
              className={classes.appTitle}
              variant="h6"
              color="inherit"
            >
              Coffee
              {title && ` - ${title}`}
            </Typography>
            <ProfileButton />
          </Toolbar>
        </AppBar>
        <div className={classes.content}>{children}</div>
        <div>
          <BottomNavigation />
        </div>
        <AppDrawer
          open={isAppDrawerOpen}
          onOpen={this._onAppDrawerOpen}
          onClose={this._onAppDrawerClose}
        />
      </div>
    );
  }

  @autobind()
  private _onAppDrawerOpen() {
    this.setState({
      isAppDrawerOpen: true
    });
  }

  @autobind()
  private _onAppDrawerClose() {
    this.setState({
      isAppDrawerOpen: false
    });
  }
}

export default withStyles(styles)(RootPageContainer);
