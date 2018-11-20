import * as React from "react";

import { autobind } from "core-decorators";

import Button from "@material-ui/core/Button";

import { setOrderStatus } from "@/services/barista/api";

export interface PrepareOrderButtonProps {
  orderId: string;
}
type Props = PrepareOrderButtonProps;
export default class PrepareOrderButton extends React.Component<Props> {
  render() {
    return <Button onClick={this._onPrepareOrder}>Prepare Order</Button>;
  }

  @autobind()
  private _onPrepareOrder() {
    const { orderId } = this.props;
    setOrderStatus(orderId, "waiting-delivery");
  }
}
