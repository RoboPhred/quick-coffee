import * as React from "react";

import { autobind } from "core-decorators";

import { RouteComponentProps, withRouter } from "react-router-dom";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import CreateIcon from "@material-ui/icons/Create";
import MailIcon from "@material-ui/icons/Mail";
import SendIcon from "@material-ui/icons/Send";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ListAltIcon from "@material-ui/icons/ListAlt";

export interface BottomNavigationProps {
  variant: "app" | "barista";
}

interface NavItem {
  path: string;
  label: string;
  icon: JSX.Element;
}

const navTypes: Record<BottomNavigationProps["variant"], NavItem[]> = {
  app: [
    {
      path: "/favorites",
      label: "Favorites",
      icon: <FavoriteIcon />
    },
    {
      path: "/menu",
      label: "Menu",
      icon: <ListAltIcon />
    },
    {
      path: "/orders",
      label: "Orders",
      icon: <MailIcon />
    }
  ],
  barista: [
    {
      path: "/barista/edit-menu",
      label: "Edit Menu",
      icon: <CreateIcon />
    },
    {
      path: "/barista/orders",
      label: "Orders",
      icon: <MailIcon />
    },
    {
      path: "/barista/deliveries",
      label: "Deliveries",
      icon: <SendIcon />
    }
  ]
};

type Props = BottomNavigationProps & RouteComponentProps;
class BaristaBottomNavigation extends React.Component<Props> {
  render() {
    const { variant, location } = this.props;
    const navs = navTypes[variant];
    return (
      <BottomNavigation
        value={location.pathname}
        showLabels
        onChange={this._onNavigationChanged}
      >
        {navs.map(nav => (
          <BottomNavigationAction
            key={nav.path}
            value={nav.path}
            label={nav.label}
            icon={nav.icon}
          />
        ))}
      </BottomNavigation>
    );
  }

  @autobind()
  private _onNavigationChanged(event: React.ChangeEvent<{}>, value: any) {
    event.preventDefault();

    const { history } = this.props;
    history.replace(value);
  }
}
export default withRouter(BaristaBottomNavigation);
