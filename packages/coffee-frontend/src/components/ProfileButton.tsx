import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";

import { autobind } from "core-decorators";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";

import UserSource from "@/services/auth/components/UserSource";
import { logout } from "@/services/auth/api";

export interface ProfileButtonProps {
  className?: string;
}
type Props = RouteComponentProps & ProfileButtonProps;
interface State {
  menuRef: HTMLElement | null;
}
class ProfileButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      menuRef: null
    };
  }

  render() {
    const { menuRef } = this.state;
    return (
      <UserSource>
        {({ isLoading, user }) => {
          if (isLoading) {
            return <CircularProgress size={24} />;
          }

          if (!user) {
            return (
              <Button color="inherit" onClick={this._onLogin}>
                Login
              </Button>
            );
          }

          return (
            <React.Fragment>
              <IconButton color="inherit" onClick={this._onOpenMenu}>
                <AccountCircle />
              </IconButton>
              <Menu
                id="profile-menu"
                anchorEl={menuRef}
                open={menuRef != null}
                onClose={this._onCloseMenu}
              >
                <MenuItem onClick={this._logout}>Logout</MenuItem>
              </Menu>
            </React.Fragment>
          );
        }}
      </UserSource>
    );
  }

  @autobind()
  private _onLogin() {
    const { history } = this.props;
    history.push("/login");
  }

  @autobind()
  private async _logout() {
    const { history } = this.props;
    await logout();
    history.push("/");
  }

  @autobind()
  private _onOpenMenu(e: React.MouseEvent<HTMLElement>) {
    this.setState({
      menuRef: e.currentTarget
    });
  }

  @autobind()
  private _onCloseMenu() {
    this.setState({
      menuRef: null
    });
  }
}
export default withRouter(ProfileButton);
