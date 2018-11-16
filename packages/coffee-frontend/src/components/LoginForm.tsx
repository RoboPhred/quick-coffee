import * as React from "react";

import { autobind } from "core-decorators";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

interface Props {
  disabled?: boolean;
  onSubmit(username: string): void;
}
interface State {
  username: string;
}

export default class LoginForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  render() {
    const { disabled } = this.props;
    const { username } = this.state;
    return (
      <div>
        <TextField
          disabled={disabled}
          label="Username"
          value={username}
          onChange={this._onUsernameChange}
        />
        <Button disabled={disabled || username === ""} onClick={this._onSubmit}>
          Login
        </Button>
      </div>
    );
  }

  @autobind()
  private _onUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      username: e.target.value
    });
  }

  @autobind()
  private async _onSubmit() {
    const { onSubmit } = this.props;
    const { username } = this.state;
    onSubmit(username);
  }
}
