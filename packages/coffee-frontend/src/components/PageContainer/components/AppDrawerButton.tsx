import * as React from "react";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

export interface AppDrawerButtonProps {
  onClick(): void;
}
type Props = AppDrawerButtonProps;

const AppDrawerButton: React.SFC<Props> = ({ onClick }) => (
  <IconButton color="inherit" onClick={onClick}>
    <MenuIcon />
  </IconButton>
);
export default AppDrawerButton;
