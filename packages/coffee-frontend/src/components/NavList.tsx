import * as React from "react";

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

export interface NavListProps {
  className?: string;
}
const NavList: React.SFC<NavListProps> = ({ className }) => (
  <List component="nav" className={className}>
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
            <ListItemLink button to="/barista/pending-orders" autoselect>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText>Pending Orders</ListItemText>
            </ListItemLink>
            <ListItemLink button to="/barista/completed-orders" autoselect>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText>Completed Orders</ListItemText>
            </ListItemLink>
          </React.Fragment>
        )
      }
    </UserSource>
  </List>
);
export default NavList;
