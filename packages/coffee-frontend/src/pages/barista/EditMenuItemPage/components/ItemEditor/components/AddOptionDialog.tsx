import * as React from "react";

import { autobind } from "core-decorators";

import { ItemOption } from "coffee-types";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export interface AddOptionDialogProps {
  open: boolean;
  onAddOption(option: ItemOption): void;
}

type Props = AddOptionDialogProps;
interface State {
  id: string;
  name: string;
  type: "boolean" | "text" | "select" | "integer";
}
class AddOptionDialog extends React.Component<AddOptionDialogProps, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      type: "text"
    };
  }

  render() {
    const { open } = this.props;
    const { type } = this.state;

    return (
      <Dialog open={open}>
        <TextField
          id="new-item-id"
          label="ID"
          variant="standard"
          onChange={this._onIdChange}
        />
        <TextField
          id="new-item-name"
          label="Name"
          variant="standard"
          onChange={this._onNameChange}
        />
        <Select id="new-item-type" value={type} onChange={this._onTypeChange}>
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="integer">Number</MenuItem>
          <MenuItem value="boolean">Boolean</MenuItem>
          <MenuItem value="select">Select</MenuItem>
        </Select>
        <Button onClick={this._onAddOption}>Add Option</Button>
      </Dialog>
    );
  }

  @autobind()
  private _onIdChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      id: e.target.value
    });
  }

  @autobind()
  private _onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: e.target.value
    });
  }

  @autobind()
  private _onTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({
      type: e.target.value as any
    });
  }

  @autobind()
  private _onAddOption() {
    const { onAddOption } = this.props;
    const { id, name, type } = this.state;
    let option: ItemOption;
    switch (type) {
      case "select":
        option = {
          id,
          name,
          type,
          choices: []
        };
        break;
      case "text":
        option = {
          id,
          name,
          type
        };
        break;
      case "boolean":
        option = {
          id,
          name,
          type
        };
        break;
      case "integer":
        option = {
          id,
          name,
          type
        };
        break;
      default:
        return;
    }
    onAddOption(option);
  }
}
export default AddOptionDialog;
