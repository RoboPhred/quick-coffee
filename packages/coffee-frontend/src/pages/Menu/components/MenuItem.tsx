import * as React from "react";

import { InventoryItem } from "coffee-types";

import ListItemText from "@material-ui/core/ListItemText";

import ListItemLink from "@/components/ListItemLink";

export interface MenuItemProps {
  item: InventoryItem;
}

type Props = MenuItemProps;
const MenuItem: React.SFC<Props> = ({ item }) => (
  <ListItemLink key={item.name} button to={`/order-item/${item.id}`}>
    <ListItemText primary={item.name} secondary={item.description} />
  </ListItemLink>
);
export default MenuItem;
