import * as React from "react";

import { autobind } from "core-decorators";

import { InventoryItem } from "coffee-types";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";

export interface ItemDetailsProps {
  item: InventoryItem;
  onChange(item: InventoryItem): void;
}

type Props = ItemDetailsProps;
export default class ItemDetails extends React.Component<Props> {
  render() {
    const { item } = this.props;
    return (
      <Card>
        <CardContent>
          <TextField
            id="item-name"
            label="Name"
            variant="standard"
            defaultValue={item.name}
            onChange={this._onNameChange}
          />
          <TextField
            id="item-description"
            label="Description"
            variant="standard"
            fullWidth
            defaultValue={item.description || ""}
            onChange={this._onDescriptionChange}
          />
        </CardContent>
      </Card>
    );
  }

  @autobind()
  private _onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    const { item, onChange } = this.props;
    onChange({
      ...item,
      name
    });
  }

  @autobind()
  private _onDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    const description = e.target.value;
    const { item, onChange } = this.props;
    onChange({
      ...item,
      description
    });
  }
}
