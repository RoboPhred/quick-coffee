import * as React from "react";

import { RouteComponentProps } from "react-router-dom";

import { createStyles, withStyles, Theme } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import ItemProvider from "@/services/backend/components/ItemProvider";

import AppPageContainer from "@/components/AppPageContainer";

import OptionsForm from "./components/OptionsForm";
import { autobind } from "core-decorators";
import { ItemOption, InventoryItem } from "coffee-types";

export type OrderFormProps = RouteComponentProps<{ item: string }>;

interface DataProps {
  isLoading: boolean;
  item: InventoryItem | null;
  errorMessage: string | null;
}

type Props = OrderFormProps & DataProps & StyleProps<ReturnType<typeof styles>>;
interface State {
  optionValues: Record<string, any>;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      overflow: "auto"
    },
    header: {
      padding: theme.spacing.unit * 2
    },
    options: {
      flexGrow: 1,
      minHeight: 0,
      width: "100%",
      height: "100%"
    },
    action: {
      float: "right",
      margin: theme.spacing.unit
    }
  });

class OrderForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { item } = props;
    this.state = {
      optionValues:
        item && item.options ? generateOptionDefaults(item.options) : {}
    };
  }

  componentDidUpdate(oldProps: Props) {
    if (oldProps.item !== this.props.item) {
      const { item } = this.props;
      this.setState({
        optionValues:
          item && item.options ? generateOptionDefaults(item.options) : {}
      });
    }
  }

  render() {
    const { classes, item, isLoading, errorMessage } = this.props;
    const { optionValues } = this.state;
    if (!item || isLoading) {
      // No data loaded yet.
      return <CircularProgress />;
    }

    if (errorMessage) {
      return errorMessage;
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
                values={optionValues}
                onChange={this._onOptionsChanged}
              />
              <Divider />
            </React.Fragment>
          )}
          <div>
            <Button
              className={classes.action}
              color="primary"
              variant="contained"
            >
              Order
            </Button>
          </div>
        </div>
      </AppPageContainer>
    );
  }

  @autobind()
  private _onOptionsChanged(values: { [option: string]: any }) {
    this.setState({
      optionValues: values
    });
  }
}

const OPTION_TYPE_DEFAULTS: Record<ItemOption["type"], any> = {
  boolean: false,
  integer: 0,
  select: "",
  text: ""
};

function generateOptionDefaults(options: ItemOption[]): Record<string, any> {
  const defaults: Record<string, any> = {};
  for (const option of options) {
    if (option.default) {
      defaults[option.id] = option.default;
      continue;
    }

    if (OPTION_TYPE_DEFAULTS[option.type] !== undefined) {
      defaults[option.id] = OPTION_TYPE_DEFAULTS[option.type];
      continue;
    }

    defaults[option.id] = null;
  }
  return defaults;
}

// We need to have the item data available during lifecycle hooks in OrderForm,
//  so wrap the component with another component to inject the provided props.
type OrderFormDataWrapperProps = OrderFormProps &
  StyleProps<ReturnType<typeof styles>>;
const OrderFormDataLoader: React.SFC<OrderFormDataWrapperProps> = ({
  match,
  ...outerProps
}) => (
  <ItemProvider itemId={match.params.item}>
    {itemProps => <OrderForm match={match} {...outerProps} {...itemProps} />}
  </ItemProvider>
);
export default withStyles(styles)(OrderFormDataLoader);
