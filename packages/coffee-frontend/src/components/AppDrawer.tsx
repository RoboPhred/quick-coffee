import * as React from "react";

import { createStyles, withStyles } from "@material-ui/core/styles";

import { RouteComponentProps, withRouter } from "react-router";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import ListAltIcon from "@material-ui/icons/ListAlt";
import MailIcon from "@material-ui/icons/Mail";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CreateIcon from "@material-ui/icons/Create";
import SendIcon from "@material-ui/icons/Send";

import UserSource from "@/services/auth/components/UserSource";

import ListItemLink from "@/components/ListItemLink";

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

type Props = AppDrawerProps & RouteComponentProps & StyleProps<typeof styles>;
const AppDrawer: React.SFC<Props> = ({
  classes,
  open,
  onOpen,
  onClose,
  location
}) => (
  <SwipeableDrawer open={open} onOpen={onOpen} onClose={onClose}>
    <List component="nav" className={classes.root}>
      <ListItemLink button to="/menu" autoselect>
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText>Menu</ListItemText>
      </ListItemLink>
      <ListItemLink button to="/orders" autoselect>
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText>Order Status</ListItemText>
      </ListItemLink>
      <ListItemLink button to="/favorites" autoselect>
        <ListItemIcon>
          <FavoriteIcon />
        </ListItemIcon>
        <ListItemText>Favorites</ListItemText>
      </ListItemLink>
      <UserSource>
        {({ user }) =>
          user &&
          user.role === "barista" && (
            <React.Fragment>
              <Divider />
              <ListItemLink button to="/barista/edit-menu" autoselect>
                <ListItemIcon>
                  <CreateIcon />
                </ListItemIcon>
                <ListItemText>Edit Menu</ListItemText>
              </ListItemLink>
              <ListItemLink button to="/barista/orders" autoselect>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText>All Orders</ListItemText>
              </ListItemLink>
              <ListItemLink button to="/barista/deliveries" autoselect>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText>Deliveries</ListItemText>
              </ListItemLink>
            </React.Fragment>
          )
        }
      </UserSource>
    </List>
  </SwipeableDrawer>
);
export default withStyles(styles)(withRouter(AppDrawer));
