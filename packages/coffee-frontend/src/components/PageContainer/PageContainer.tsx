import * as React from "react";

import { autobind } from "core-decorators";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";

import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import ProfileButton from "@/components/ProfileButton";

import BackButton from "./components/BackButton";
import AppDrawerButton from "./components/AppDrawerButton";
import BottomNavigation from "./components/BottomNavigation";
import NavList from "../NavList";

export interface PageContainerProps {
  title?: string;
  variant: "app" | "subpage" | "barista";
}

const NAV_WIDTH = 250;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "100%"
    },
    appRoot: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${NAV_WIDTH}px)`,
        marginLeft: NAV_WIDTH
      }
    },
    toolbar: {
      ...theme.mixins.toolbar,
      display: "flex",
      paddingLeft: theme.spacing.unit * 3,
      alignItems: "center"
    },
    appTitle: {
      flexGrow: 1
    },
    appDrawer: {
      width: NAV_WIDTH
    },
    content: {
      width: "100%",
      height: "100%"
    }
  });

type Props = PageContainerProps & { width: Breakpoint } & StyleProps<
    ReturnType<typeof styles>
  >;
interface State {
  isAppDrawerOpen: boolean;
}
class PageContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isAppDrawerOpen: false
    };
  }

  render() {
    const { classes, children, variant, title, width } = this.props;
    const { isAppDrawerOpen } = this.state;

    const isSmall = !isWidthUp("sm", width);

    let navList: JSX.Element = (
      <div className={classes.appDrawer}>
        <div className={classes.toolbar}>
          <Typography variant="h6" color="textSecondary">
            Coffee
          </Typography>
        </div>
        <Divider />
        <NavList />
      </div>
    );

    if (isSmall) {
      navList = (
        <SwipeableDrawer
          variant="temporary"
          open={isAppDrawerOpen}
          onOpen={this._onAppDrawerOpen}
          onClose={this._onAppDrawerClose}
        >
          {navList}
        </SwipeableDrawer>
      );
    } else {
      navList = (
        <Drawer variant="permanent" anchor="left">
          {navList}
        </Drawer>
      );
    }

    return (
      <div className={classes.root}>
        {navList}
        <div className={classes.appRoot}>
          <AppBar position="static">
            <Toolbar>
              {(variant === "subpage" && <BackButton />) ||
                (isSmall && (
                  <AppDrawerButton onClick={this._onAppDrawerOpen} />
                ))}
              <Typography
                className={classes.appTitle}
                variant="h6"
                color="inherit"
              >
                {isSmall && "Coffee"}
                {isSmall && title && " - "}
                {title}
              </Typography>
              <ProfileButton />
            </Toolbar>
          </AppBar>
          <div className={classes.content}>{children}</div>
          {(variant === "app" || variant === "barista") && (
            <BottomNavigation variant={variant} />
          )}
        </div>
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
export default withStyles(styles)(withWidth()(PageContainer));
