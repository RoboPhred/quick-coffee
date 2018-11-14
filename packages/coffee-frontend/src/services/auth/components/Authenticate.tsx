import * as React from "react";

import { autobind } from "core-decorators";

import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";

import { getIsLoggedIn, login } from "../api";

import AppPageContainer from "@/components/AppPageContainer";

import LoginForm from "./LoginForm";

type Props = {};
interface State {
  showLoginPrompt: boolean;
  isLoggedIn: boolean | null;
}
export default class Authenticate extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showLoginPrompt: false,
      isLoggedIn: null
    };
  }

  componentDidMount() {
    this._checkLogin();
  }

  render() {
    const { isLoggedIn, showLoginPrompt } = this.state;
    if (isLoggedIn === null) {
      return <CircularProgress />;
    }
    if (showLoginPrompt) {
      return (
        <Dialog fullScreen open>
          <AppPageContainer title="Login">
            <LoginForm onSubmit={this._onLogin} />
          </AppPageContainer>
        </Dialog>
      );
    }

    return React.Children.only(this.props.children);
  }

  private async _checkLogin() {
    const isLoggedIn = await getIsLoggedIn();
    this.setState({
      showLoginPrompt: !isLoggedIn,
      isLoggedIn
    });
  }

  @autobind()
  private async _onLogin(username: string) {
    try {
      await login(username);
      this.setState({
        showLoginPrompt: false,
        isLoggedIn: true
      });
    } catch {
      // TODO: Show login error
    }
  }
}
