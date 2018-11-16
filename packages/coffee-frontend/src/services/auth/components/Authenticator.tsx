import * as React from "react";

import { autobind } from "core-decorators";

import { getIsLoggedIn, login } from "../api";

export interface AuthenticatorRequiresLoginProps {
  isLoggingIn: boolean;
  loginErrorMessage: string | null;
  login(username: string): void;
}
export interface AuthenticatorProps {
  requiresLogin(props: AuthenticatorRequiresLoginProps): JSX.Element;
}

type Props = AuthenticatorProps;
interface State {
  showLoginPrompt: boolean;
  isLoggingIn: boolean;
  loginErrorMessage: string | null;
}
export default class Authenticator extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showLoginPrompt: true,
      isLoggingIn: true,
      loginErrorMessage: null
    };
  }

  componentDidMount() {
    this._checkLogin();
  }

  render() {
    const { requiresLogin } = this.props;
    const { isLoggingIn, loginErrorMessage, showLoginPrompt } = this.state;

    if (showLoginPrompt) {
      return requiresLogin({
        isLoggingIn,
        loginErrorMessage,
        login: this._login
      });
    }

    return React.Children.only(this.props.children);
  }

  private async _checkLogin() {
    const isLoggedIn = await getIsLoggedIn();
    this.setState({
      showLoginPrompt: !isLoggedIn,
      isLoggingIn: false
    });
  }

  @autobind()
  private async _login(username: string) {
    try {
      await login(username);
    } catch (e) {
      this.setState({
        isLoggingIn: false,
        showLoginPrompt: true,
        loginErrorMessage: e.message
      });
      return;
    }

    this.setState({
      isLoggingIn: false,
      showLoginPrompt: false,
      loginErrorMessage: null
    });
  }
}
