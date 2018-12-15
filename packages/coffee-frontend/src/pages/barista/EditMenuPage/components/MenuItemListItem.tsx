import * as React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";

import DeleteIcon from "@material-ui/icons/Delete";

export interface MenuItemListItemProps {
  itemName: string;
  onClick(): void;
  onDelete(): void;
}
type Props = MenuItemListItemProps;
export default class MenuItemListItem extends React.Component<Props> {
  render() {
    const { itemName, onClick, onDelete } = this.props;
    return (
      <ListItem button onClick={onClick}>
        <ListItemText>{itemName}</ListItemText>
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}
