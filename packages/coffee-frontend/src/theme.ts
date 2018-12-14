import { createMuiTheme } from "@material-ui/core/styles";

// Theme settings can be adjusted here.
//  https://material-ui.com/style/color/

const theme = createMuiTheme({
  typography: {
    // Opt in to using the newer set of font styles.
    //  The old styles are deprecated and will be
    //  removed.
    useNextVariants: true
  },
  palette: {
    type: "dark",
    primary: {
      light: "#ff6434",
      main: "#dd2c00",
      dark: "#a30000",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ffb04c",
      main: "#f57f17",
      dark: "#bc5100",
      contrastText: "#000"
    }
  }
});
export default theme;
