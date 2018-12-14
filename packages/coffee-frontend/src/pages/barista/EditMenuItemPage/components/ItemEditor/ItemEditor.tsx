import * as React from "react";

import { autobind } from "core-decorators";

import { InventoryItem, ItemOption } from "coffee-types";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import ItemOptionsList from "./components/ItemOptionsList";

export interface ItemEditorProps {
  item: InventoryItem;
  onChange(item: InventoryItem): void;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      flex: "0 1 auto",
      height: "100%"
    },
    form: {
      flexGrow: 1,
      minHeight: 0,
      height: "100%",
      overflowY: "auto"
    },
    options: {
      marginTop: theme.spacing.unit
    },
    actions: {
      alignSelf: "flex-end"
    }
  });

type Props = ItemEditorProps & StyleProps<ReturnType<typeof styles>>;
class ItemEditor extends React.Component<Props> {
  render() {
    const { classes, item } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.form}>
          <Card>
            <CardContent>
              <TextField
                id="item-name"
                label="Name"
                variant="standard"
                defaultValue={item.name}
                onChange={this._onNameChange}
              />
              <TextField
                id="item-description"
                label="Description"
                variant="standard"
                fullWidth
                defaultValue={item.description || ""}
                onChange={this._onDescriptionChange}
              />
            </CardContent>
          </Card>
          <ItemOptionsList
            className={classes.options}
            options={item.options || []}
            onChange={this._onOptionsChange}
          />
        </div>
        <div className={classes.actions}>
          <Button color="primary">Save Changes</Button>
        </div>
      </div>
    );
  }

  @autobind()
  private _onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    const { item, onChange } = this.props;
    onChange({
      ...item,
      name
    });
  }

  @autobind()
  private _onDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    const description = e.target.value;
    const { item, onChange } = this.props;
    onChange({
      ...item,
      description
    });
  }

  @autobind()
  private _onOptionsChange(options: ItemOption[]) {
    const { item, onChange } = this.props;
    onChange({
      ...item,
      options
    });
  }
}
export default withStyles(styles)(ItemEditor);
