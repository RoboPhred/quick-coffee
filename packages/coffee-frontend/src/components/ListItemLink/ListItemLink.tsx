import * as React from "react";

import { withRouter, RouteComponentProps } from "react-router";

import ListItem, { ListItemProps } from "@material-ui/core/ListItem";

export interface MenuItemProps
  extends Omit<ListItemProps, "href" | "component"> {
  to: string;
}

type Props = MenuItemProps & RouteComponentProps;
const ListItemLink: React.SFC<Props> = ({
  children,
  history,
  to,
  ...props
}) => (
  <ListItem
    {...props}
    component="a"
    href={history.createHref({ pathname: to })}
  >
    {children}
  </ListItem>
);
export default withRouter(ListItemLink);
