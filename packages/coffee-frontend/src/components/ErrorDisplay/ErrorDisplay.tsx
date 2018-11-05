import * as React from "react";
import { Typography } from "@material-ui/core";

export interface ErrorPageProps {
  errorMessage: string;
}
const ErrorDisplay: React.SFC<ErrorPageProps> = ({ errorMessage }) => (
  <Typography variant="body1" color="error">
    {errorMessage}
  </Typography>
);
export default ErrorDisplay;
