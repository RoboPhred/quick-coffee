import * as React from "react";
import { render } from "react-dom";

// Include es6 promise polyfill.
import "es6-promise/auto";

// Include fetch polyfill.
import "whatwg-fetch";

// Include the Roboto fonts.
import "typeface-roboto";

// A component providing application state and action invocation to react components.
import { Provider } from "react-redux";

// A component that includes the global css rules for material-ui.
import CssBaseline from "@material-ui/core/CssBaseline";

// The root component that syncs the url with the page according
//  to our routes.
//  The host must support serving this site on all subpaths.
import { ConnectedRouter } from "connected-react-router";

// The theme provider for material-ui
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

// Some basic css for the few non-react html elements we have.
import "@/style.css";

// Theme configuration for material-ui.
import theme from "@/theme";

// Browser history tracker.
import history from "@/history";

// Application state storage.
import store from "@/state/store";

// Application url routes.
import Routes from "@/routes";

const Root: React.SFC = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>
);

// Render the application inside the #root element.
render(<Root />, document.getElementById("root"));
