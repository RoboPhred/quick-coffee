import * as React from "react";

import { RouteComponentProps, withRouter } from "react-router";

import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export interface BackButtonProps {
  className?: string;
}
type Props = BackButtonProps & RouteComponentProps;
const BackButton: React.SFC<Props> = ({ className, history }) => (
  <IconButton
    className={className}
    color="inherit"
    aria-label="Back"
    onClick={() => history.goBack()}
  >
    <ArrowBackIcon />
  </IconButton>
);
export default withRouter(BackButton);
