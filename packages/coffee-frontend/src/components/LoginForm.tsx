import * as React from "react";

import { autobind } from "core-decorators";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export interface LoginFormProps {
  disabled?: boolean;
  onSubmit(username: string): void;
}
interface State {
  username: string;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: theme.spacing.unit
    }
  });

type Props = LoginFormProps & StyleProps<ReturnType<typeof styles>>;
class LoginForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  render() {
    const { classes, disabled } = this.props;
    const { username } = this.state;
    return (
      <div className={classes.root}>
        <TextField
          disabled={disabled}
          label="Username"
          value={username}
          onChange={this._onUsernameChange}
          onKeyPress={this._onUsernameKeyPress}
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
  private _onUsernameKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") {
      return;
    }
    this._onSubmit();
  }

  @autobind()
  private async _onSubmit() {
    const { onSubmit } = this.props;
    const { username } = this.state;
    onSubmit(username);
  }
}
export default withStyles(styles)(LoginForm);
