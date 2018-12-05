import * as React from "react";

import { TextItemOption } from "coffee-types";

import TextField from "@material-ui/core/TextField";

export interface TextItemOptionDetailsProps {
  option: TextItemOption;
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
        />
        <TextField
          id="option-default"
          label="Default Value"
          variant="standard"
          fullWidth
          defaultValue={option.default || ""}
        />
      </React.Fragment>
    );
  }
}
