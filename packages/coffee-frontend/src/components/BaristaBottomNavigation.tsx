import * as React from "react";

import { autobind } from "core-decorators";

import { RouteComponentProps, withRouter } from "react-router-dom";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import CreateIcon from "@material-ui/icons/Create";
import MailIcon from "@material-ui/icons/Mail";
import SendIcon from "@material-ui/icons/Send";

type Props = RouteComponentProps;
class BaristaBottomNavigation extends React.Component<Props> {
  render() {
    const { location } = this.props;
    const selectedValue = location.pathname.split("/", 3)[2] || "";
    return (
      <BottomNavigation
        value={selectedValue}
        showLabels
        onChange={this._onNavigationChanged}
      >
        <BottomNavigationAction
          value="edit-menu"
          label="Edit Menu"
          icon={<CreateIcon />}
        />
        <BottomNavigationAction
          value="orders"
          label="Orders"
          icon={<MailIcon />}
        />
        <BottomNavigationAction
          value="deliveries"
          label="Deliveries"
          icon={<SendIcon />}
        />
      </BottomNavigation>
    );
  }

  @autobind()
  private _onNavigationChanged(event: React.ChangeEvent<{}>, value: any) {
    const { history } = this.props;
    history.replace(`/barista/${value}`);
  }
}
export default withRouter(BaristaBottomNavigation);
