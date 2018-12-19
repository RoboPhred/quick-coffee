import * as React from "react";
import { InventoryItem } from "coffee-types";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import MenuItem from "./MenuItem";

export interface MenuProps {
  className?: string;
  items: InventoryItem[];
}

const styles = (theme: Theme) =>
  createStyles({
    menuItem: {
      margin: theme.spacing.unit
    }
  });

type Props = MenuProps & StyleProps<typeof styles>;
const Menu: React.SFC<Props> = ({ className, classes, items }) => (
  <div className={className}>
    {items.map(item => (
      <MenuItem className={classes.menuItem} key={item.id} item={item} />
    ))}
  </div>
);
export default withStyles(styles)(Menu);
