import * as React from "react";

import { autobind } from "core-decorators";

import { SelectionItemOption } from "coffee-types";

import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import DeleteIcon from "@material-ui/icons/Delete";

import TextField from "@material-ui/core/TextField";

export interface SelectItemOptionDetailsProps {
  option: SelectionItemOption;
  onChange(option: SelectionItemOption): void;
}

type Props = SelectItemOptionDetailsProps;
export default class SelectItemOptionDetails extends React.Component<Props> {
  render() {
    const { option } = this.props;
    return (
      <React.Fragment>
        <Typography variant="h6">Choices</Typography>
        <List>
          {option.choices.map((x, index) => (
            <ListItem key={index}>
              <TextField
                value={x}
                onChange={this._onChoiceChanged.bind(this, index)}
                variant="standard"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={this._onDeleteChoice.bind(this, index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Button onClick={this._onAddChoice}>Add Choice</Button>
      </React.Fragment>
    );
  }

  @autobind()
  private _onAddChoice() {
    const { option, onChange } = this.props;
    onChange({
      ...option,
      choices: [...option.choices, ""]
    });
  }

  @autobind()
  private _onChoiceChanged(
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const choice = e.target.value;
    const { option, onChange } = this.props;
    const choices = [...option.choices];
    choices[index] = choice;
    onChange({
      ...option,
      choices
    });
  }

  private _onDeleteChoice(index: number) {
    const { option, onChange } = this.props;
    const choices = [...option.choices];
    choices.splice(index, 1);
    onChange({
      ...option,
      choices
    });
  }
}
