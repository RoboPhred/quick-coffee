import * as React from "react";

import { autobind } from "core-decorators";

import { BooleanItemOption } from "coffee-types";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export interface BooleanItemOptionDetailsProps {
  option: BooleanItemOption;
  onChange(option: BooleanItemOption): void;
}

type Props = BooleanItemOptionDetailsProps;
export default class BooleanItemOptionDetails extends React.Component<Props> {
  render() {
    const { option } = this.props;
    return (
      <React.Fragment>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={option.default || false}
              onChange={this._onDefaultValueChange}
            />
          }
          label="Default Value"
        />
      </React.Fragment>
    );
  }

  @autobind()
  private _onDefaultValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const defaultValue = e.target.checked;
    const { option, onChange } = this.props;
    onChange({
      ...option,
      default: defaultValue
    });
  }
}
