import * as React from "react";

import { autobind } from "core-decorators";

import {
  ItemOption,
  InventoryItem,
  OrderRequestItem,
  FavoriteRequestItem
} from "coffee-types";

import { createStyles, withStyles, Theme } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import FavoriteButton from "@/components/FavoriteButton";

import OptionsForm from "./components/OptionsForm";

interface OrderFormProps {
  item: InventoryItem;
  onOrder(order: OrderRequestItem): void;
}

type Props = OrderFormProps & StyleProps<ReturnType<typeof styles>>;
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
      flexShrink: 1,
      minHeight: 0,
      width: "100%",
      height: "100%"
    },
    actionBar: {
      display: "flex",
      flexDirection: "row",
      flexGrow: 0,
      flexShrink: 1,
      justifyContent: "flex-end",
      padding: theme.spacing.unit,
      height: 9 * theme.spacing.unit
    },
    actionFavorite: {
      marginRight: 2 * theme.spacing.unit
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
    const { classes, item } = this.props;
    const { optionValues } = this.state;

    return (
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
        <div className={classes.actionBar}>
          <FavoriteButton
            order={{
              itemId: item.id,
              options: optionValues
            }}
          />
          <Button color="primary" variant="contained" onClick={this._onOrder}>
            Order
          </Button>
        </div>
      </div>
    );
  }

  @autobind()
  private _onOptionsChanged(values: { [option: string]: any }) {
    this.setState({
      optionValues: values
    });
  }

  @autobind()
  private _onOrder() {
    const { item, onOrder } = this.props;
    const { optionValues } = this.state;

    const request: OrderRequestItem = {
      itemId: item.id,
      options: { ...optionValues }
    };

    onOrder(request);
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

export default withStyles(styles)(OrderForm);
