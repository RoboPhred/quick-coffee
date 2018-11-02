import * as React from "react";
import { render } from "react-dom";

// Include es6 promise polyfill.
import "es6-promise/auto";

// Include fetch polyfill.
import "whatwg-fetch";

// Include the Roboto fonts.
import "typeface-roboto";

// A component that includes the global css rules for material-ui.
import CssBaseline from "@material-ui/core/CssBaseline";

// The root component that controlls our application routes.
//  BrowserRouter will use a true url format, so the host must support
//  serving this application for all subpaths.
// Alternatively, HashRouter can be used to include the path after a hash,
//  eg www.foo.com/#/some/path
import { BrowserRouter as Router } from "react-router-dom";

// The theme provider for material-ui
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

// Some basic css for the few non-react html elements we have.
import "@/style.css";

// Theme configuration for material-ui.
import theme from "@/theme";

// Our application routes.
import Routes from "@/routes";

const Root: React.SFC = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Routes />
    </Router>
  </MuiThemeProvider>
);

// Render the application inside the #root element.
render(<Root />, document.getElementById("root"));
