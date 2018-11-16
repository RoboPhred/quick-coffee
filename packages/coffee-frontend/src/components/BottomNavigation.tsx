import * as React from "react";

import { autobind } from "core-decorators";

import { RouteComponentProps, withRouter } from "react-router-dom";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import FavoriteIcon from "@material-ui/icons/Favorite";
import ListAlt from "@material-ui/icons/ListAlt";
import Mail from "@material-ui/icons/Mail";

type Props = RouteComponentProps;
class AppBottomNavigation extends React.Component<Props> {
  render() {
    const { location } = this.props;
    const selectedValue = location.pathname.split("/", 2)[1] || "";
    return (
      <BottomNavigation
        value={selectedValue}
        showLabels
        onChange={this._onNavigationChanged}
      >
        <BottomNavigationAction
          value="favorites"
          label="Favorites"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction value="menu" label="Menu" icon={<ListAlt />} />
        <BottomNavigationAction value="orders" label="Orders" icon={<Mail />} />
      </BottomNavigation>
    );
  }

  @autobind()
  private _onNavigationChanged(event: React.ChangeEvent<{}>, value: any) {
    const { history } = this.props;
    history.replace(`/${value}`);
  }
}
export default withRouter(AppBottomNavigation);
