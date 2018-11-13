import * as React from "react";
import { RouteComponentProps } from "react-router";

import { autobind } from "core-decorators";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import { login } from "@/services/auth/api";

import AppPageContainer from "@/components/AppPageContainer";

type Props = RouteComponentProps;
interface State {
  isLoggingIn: boolean;
  username: string;
}
export default class LoginPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoggingIn: false,
      username: ""
    };
  }

  render() {
    const { username, isLoggingIn } = this.state;
    return (
      <AppPageContainer title="Login">
        <TextField
          placeholder="Username"
          disabled={isLoggingIn}
          value={username}
          onChange={this._onUsernameChange}
        />
        <Button disabled={isLoggingIn} onClick={this._onLogin}>
          Login
        </Button>
        {isLoggingIn && <CircularProgress />}
      </AppPageContainer>
    );
  }

  @autobind()
  private _onUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      username: e.target.value
    });
  }

  @autobind()
  private async _onLogin() {
    const { username } = this.state;
    const { history } = this.props;

    this.setState({
      isLoggingIn: true
    });

    await login(username);

    history.replace("/menu");
  }
}
