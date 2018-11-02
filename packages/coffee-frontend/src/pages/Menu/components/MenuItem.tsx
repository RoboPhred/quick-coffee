import * as React from "react";

import { withRouter, RouteComponentProps } from "react-router";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { InventoryItem } from "@/services/inventory/types";

export interface MenuItemProps {
  item: InventoryItem;
}

type Props = MenuItemProps & RouteComponentProps;
const MenuItem: React.SFC<Props> = ({ item, history }) => (
  <ListItem
    key={item.name}
    button
    component="a"
    href={history.createHref({ pathname: `/add-item/${item.name}` })}
  >
    <ListItemText primary={item.name} secondary={item.description} />
  </ListItem>
);
export default withRouter(MenuItem);
