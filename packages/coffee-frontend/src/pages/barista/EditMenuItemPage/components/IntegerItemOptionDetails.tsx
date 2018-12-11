import * as React from "react";

import { IntegerItemOption } from "coffee-types";

import TextField from "@material-ui/core/TextField";

export interface IntegerItemOptionDetailsProps {
  option: IntegerItemOption;
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
          defaultValue={option.default || ""}
        />
      </React.Fragment>
    );
  }
}
