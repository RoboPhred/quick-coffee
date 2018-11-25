import * as React from "react";

import { autobind } from "core-decorators";

import Button from "@material-ui/core/Button";

import { setOrderStatus } from "@/services/barista/api";

export interface PrepareOrderButtonProps {
  orderId: number;
}
type Props = PrepareOrderButtonProps;
export default class CompleteOrderButton extends React.Component<Props> {
  render() {
    return <Button onClick={this._onCompleteOrder}>Complete Order</Button>;
  }

  @autobind()
  private _onCompleteOrder() {
    const { orderId } = this.props;
    setOrderStatus(orderId, "completed");
  }
}
