import * as React from "react";

import { autobind } from "core-decorators";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AppDrawer from "@/components/AppDrawer";

export interface AppDrawerButtonProps {
  className?: string;
}
type Props = AppDrawerButtonProps;
interface State {
  isAppDrawerOpen: boolean;
}
export default class AppDrawerButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isAppDrawerOpen: false
    };
  }

  render() {
    const { className } = this.props;
    const { isAppDrawerOpen } = this.state;
    return (
      <IconButton
        color="inherit"
        className={className}
        onClick={this._onAppDrawerOpen}
      >
        <MenuIcon />
        <AppDrawer
          open={isAppDrawerOpen}
          onOpen={this._onAppDrawerOpen}
          onClose={this._onAppDrawerClose}
        />
      </IconButton>
    );
  }

  @autobind()
  private _onAppDrawerOpen() {
    this.setState({
      isAppDrawerOpen: true
    });
  }

  @autobind()
  private _onAppDrawerClose() {
    this.setState({
      isAppDrawerOpen: false
    });
  }
}
