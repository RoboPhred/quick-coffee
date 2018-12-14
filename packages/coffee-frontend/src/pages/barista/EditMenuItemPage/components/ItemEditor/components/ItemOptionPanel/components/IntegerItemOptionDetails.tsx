import * as React from "react";

import { autobind } from "core-decorators";

import { IntegerItemOption } from "coffee-types";

import TextField from "@material-ui/core/TextField";

export interface IntegerItemOptionDetailsProps {
  option: IntegerItemOption;
  onChange(option: IntegerItemOption): void;
}

type Props = IntegerItemOptionDetailsProps;
export default class IntegerItemOptionDetails extends React.Component<Props> {
  render() {
    const { option } = this.props;
    return (
      <React.Fragment>
        <TextField
          id="option-default"
          label="Default Value"
          variant="standard"
          type="number"
          defaultValue={option.default || ""}
          onChange={this._onDefaultChange}
        />
      </React.Fragment>
    );
  }

  @autobind()
  private _onDefaultChange(e: React.ChangeEvent<HTMLInputElement>) {
    let defaultValue = Number(e.target.value);
    if (isNaN(defaultValue)) {
      defaultValue = 0;
    }
    const { option, onChange } = this.props;
    onChange({
      ...option,
      default: defaultValue
    });
  }
}
