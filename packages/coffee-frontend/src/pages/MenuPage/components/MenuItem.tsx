import * as React from "react";

import { InventoryItem } from "coffee-types";

import { Link } from "react-router-dom";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import coffeeCupSvg from "@assets/images/coffee-cup.svg";

import ButtonLink from "@/components/ButtonLink";

export interface MenuItemProps {
  className?: string;
  item: InventoryItem;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      height: 120
    },
    media: {
      width: 80,
      height: 80,
      alignSelf: "center"
    },
    content: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      marginLeft: theme.spacing.unit
    },
    title: {
      marginTop: 2 * theme.spacing.unit
    },
    orderButton: {
      alignSelf: "flex-end",
      marginLeft: "auto"
    }
  });

type Props = MenuItemProps & StyleProps<typeof styles>;
const MenuItem: React.SFC<Props> = ({ classes, className, item }) => (
  <Paper elevation={0} className={`${classes.root} ${className}`}>
    <Link className={classes.media} to={`/order-item/${item.id}`}>
      <img title={item.name} src={coffeeCupSvg} />
    </Link>
    <div className={classes.content}>
      <Typography className={classes.title} variant="body1" color="textPrimary">
        {item.name}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {item.description}
      </Typography>
    </div>
    <ButtonLink className={classes.orderButton} to={`/order-item/${item.id}`}>
      Order
    </ButtonLink>
  </Paper>
);
export default withStyles(styles)(MenuItem);
