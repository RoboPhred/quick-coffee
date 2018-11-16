import * as React from "react";

import { autobind } from "core-decorators";

import { login, getUserToken } from "../api";
import { UserTokenPayload } from "coffee-types";

export interface AuthenticatorRequiresLoginProps {
  isLoggingIn: boolean;
  loginErrorMessage: string | null;
  login(username: string): void;
}
export interface AuthenticatorRenderProps {
  user: UserTokenPayload;
}
export interface AuthenticatorProps {
  requiresLogin(props: AuthenticatorRequiresLoginProps): React.ReactNode;
  children(props: AuthenticatorRenderProps): React.ReactNode;
}

type Props = AuthenticatorProps;
interface State {
  isLoggingIn: boolean;
  loginErrorMessage: string | null;
  user: UserTokenPayload | null;
}
export default class Authenticator extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoggingIn: true,
      loginErrorMessage: null,
      user: null
    };
  }

  componentDidMount() {
    this._checkLogin();
  }

  render() {
    const { requiresLogin } = this.props;
    const { isLoggingIn, loginErrorMessage, user } = this.state;

    if (!user) {
      return requiresLogin({
        isLoggingIn,
        loginErrorMessage,
        login: this._login
      });
    }

    return this.props.children({ user });
  }

  private async _checkLogin() {
    const user = await getUserToken();
    this.setState({
      user,
      isLoggingIn: false
    });
  }

  @autobind()
  private async _login(username: string) {
    let user: UserTokenPayload | null = null;
    try {
      user = await login(username);
    } catch (e) {
      this.setState({
        isLoggingIn: false,
        loginErrorMessage: e.message,
        user: null
      });
      return;
    }

    this.setState({
      isLoggingIn: false,
      loginErrorMessage: null,
      user
    });
  }
}
