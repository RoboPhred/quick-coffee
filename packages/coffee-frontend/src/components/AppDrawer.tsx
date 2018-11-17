import * as React from "react";

import { createStyles, withStyles } from "@material-ui/core/styles";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

import UserSource from "@/services/auth/components/UserSource";
import ListItemLink from "./ListItemLink";

export interface AppDrawerProps {
  open: boolean;
  onOpen(): void;
  onClose(): void;
}

const styles = createStyles({
  root: {
    width: 250
  }
});

type Props = AppDrawerProps & StyleProps<typeof styles>;
const AppDrawer: React.SFC<Props> = ({ classes, open, onOpen, onClose }) => (
  <SwipeableDrawer open={open} onOpen={onOpen} onClose={onClose}>
    <List className={classes.root}>
      <UserSource>
        {({ user }) =>
          user &&
          user.role === "barista" && (
            <ListItemLink to="/barista">
              <ListItemText>Barista</ListItemText>
            </ListItemLink>
          )
        }
      </UserSource>
    </List>
  </SwipeableDrawer>
);
export default withStyles(styles)(AppDrawer);
