import * as React from "react";

import { SelectionItemOption } from "coffee-types";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export interface SelectItemOptionDetailsProps {
  option: SelectionItemOption;
}

type Props = SelectItemOptionDetailsProps;
export default class SelectItemOptionDetails extends React.Component<Props> {
  render() {
    const { option } = this.props;
    return (
      <React.Fragment>
        <List>
          {option.choices.map(x => (
            <ListItem key={x}>
              <ListItemText primary={x} />
            </ListItem>
          ))}
        </List>
      </React.Fragment>
    );
  }
}
