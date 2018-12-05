import * as React from "react";

import { BooleanItemOption } from "coffee-types";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import TextField from "@material-ui/core/TextField";

export interface BooleanItemOptionDetailsProps {
  option: BooleanItemOption;
}

type Props = BooleanItemOptionDetailsProps;
export default class BooleanItemOptionDetails extends React.Component<Props> {
  render() {
    const { option } = this.props;
    return (
      <React.Fragment>
        <FormControlLabel
          control={<Checkbox defaultChecked={option.default || false} />}
          label="Default Value"
        />
      </React.Fragment>
    );
  }
}
