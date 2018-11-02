import * as React from "react";

import { find } from "lodash-es";

import { RouteComponentProps } from "react-router-dom";

import { createStyles, withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import InventoryProvider from "@/services/inventory/components/InventoryProvider";

import AppPageContainer from "@/components/AppPageContainer";

import ItemNotFound from "./components/ItemNotFound";
import OptionsForm from "./components/OptionsForm";

const styles = createStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    overflow: "scroll"
  },
  header: {
    // Grid baseline is 8px
    padding: "16px"
  },
  options: {
    flexGrow: 1,
    minHeight: 0,
    width: "100%",
    height: "100%"
  },
  action: {
    float: "right"
  }
});

type Props = RouteComponentProps<{ item: string }> & StyleProps<typeof styles>;

const OrderForm: React.SFC<Props> = ({ classes, match }) => (
  <InventoryProvider>
    {({ items }) => {
      if (!items) {
        // No data loaded yet.
        return <CircularProgress />;
      }

      const item = find(items, x => x.id === match.params.item);
      if (!item) {
        return <ItemNotFound />;
      }

      return (
        <AppPageContainer title={`Order - ${item.name}`}>
          <div className={classes.root}>
            <div className={classes.header}>
              <Typography variant="h6">{item.name}</Typography>
              {item.description && (
                <Typography variant="subtitle1">{item.description}</Typography>
              )}
            </div>
            {item.options && (
              <React.Fragment>
                <Divider />
                <OptionsForm
                  className={classes.options}
                  options={item.options}
                />
                <Divider />
              </React.Fragment>
            )}
            <div>
              <Button className={classes.action} color="primary">
                Order
              </Button>
            </div>
          </div>
        </AppPageContainer>
      );
    }}
  </InventoryProvider>
);
export default withStyles(styles)(OrderForm);
