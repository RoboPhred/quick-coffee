import * as React from "react";

import { autobind } from "core-decorators";

import { TextItemOption } from "coffee-types";

import TextField from "@material-ui/core/TextField";

export interface TextItemOptionDetailsProps {
  option: TextItemOption;
  onChange(option: TextItemOption): void;
}

type Props = TextItemOptionDetailsProps;
export default class TextItemOptionDetails extends React.Component<Props> {
  render() {
    const { option } = this.props;
    return (
      <React.Fragment>
        <TextField
          id="option-placeholder"
          label="Placeholder"
          variant="standard"
          fullWidth
          defaultValue={option.placeholder || ""}
          onChange={this._onPlaceholderChange}
        />
        <TextField
          id="option-default"
          label="Default Value"
          variant="standard"
          fullWidth
          defaultValue={option.default || ""}
          onChange={this._onDefaultValueChange}
        />
      </React.Fragment>
    );
  }

  @autobind()
  private _onPlaceholderChange(e: React.ChangeEvent<HTMLInputElement>) {
    const placeholder = e.target.value;
    const { option, onChange } = this.props;
    onChange({
      ...option,
      placeholder
    });
  }

  @autobind()
  private _onDefaultValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const defaultValue = e.target.value;
    const { option, onChange } = this.props;
    onChange({
      ...option,
      default: defaultValue
    });
  }
}
