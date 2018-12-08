import * as React from "react";

import { InventoryItem } from "coffee-types";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import ItemOptionsList from "./ItemOptionsList";

export interface ItemEditorProps {
  item: InventoryItem;
}

const styles = (theme: Theme) =>
  createStyles({
    options: {
      marginTop: theme.spacing.unit
    }
  });

type Props = ItemEditorProps & StyleProps<ReturnType<typeof styles>>;
class ItemEditor extends React.Component<Props> {
  render() {
    const { classes, item } = this.props;
    return (
      <form>
        <TextField
          id="item-name"
          label="Name"
          variant="standard"
          defaultValue={item.name}
        />
        <TextField
          id="item-description"
          label="Description"
          variant="standard"
          fullWidth
          defaultValue={item.description || ""}
        />
        <ItemOptionsList
          className={classes.options}
          options={item.options || []}
        />
        <Button color="primary">Save Changes</Button>
      </form>
    );
  }
}
export default withStyles(styles)(ItemEditor);
