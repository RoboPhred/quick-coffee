import * as React from "react";

import { autobind } from "core-decorators";

import { ItemOption } from "coffee-types";

import Button from "@material-ui/core/Button";

import AddOptionDialog from "./AddOptionDialog";

export interface AddOptionButtonProps {
  onAddOption(option: ItemOption): void;
}

type Props = AddOptionButtonProps;
interface State {
  isAddingOption: boolean;
}
class AddOptionButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isAddingOption: false
    };
  }

  render() {
    const { isAddingOption } = this.state;
    return (
      <React.Fragment>
        <Button onClick={this._onAddOptionOpen}>Add Option</Button>
        <AddOptionDialog
          open={isAddingOption}
          onAddOption={this._onAddOption}
        />
      </React.Fragment>
    );
  }

  @autobind()
  private _onAddOptionOpen() {
    this.setState({
      isAddingOption: true
    });
  }

  @autobind()
  private _onAddOption(option: ItemOption) {
    const { onAddOption } = this.props;
    this.setState({
      isAddingOption: false
    });
    onAddOption(option);
  }
}
export default AddOptionButton;
