import * as React from "react";
import { connect } from "react-redux";

import { autobind } from "core-decorators";

import { OrderRequestItem } from "coffee-types";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import FavoriteIcon from "@material-ui/icons/Favorite";

import { addFavorite } from "@/services/favorites/actions/add-favorite";

export interface FavoriteButtonProps {
  order: OrderRequestItem;
}

const mapDispatchToProps = {
  addFavorite
};
type DispatchProps = typeof mapDispatchToProps;

const styles = (theme: Theme) =>
  createStyles({
    dialogRoot: {
      display: "flex",
      flexDirection: "column",
      margin: `0px ${theme.spacing.unit}px`
    },
    input: {
      marginBottom: theme.spacing.unit
    }
  });

type Props = FavoriteButtonProps &
  StyleProps<ReturnType<typeof styles>> &
  DispatchProps;
interface State {
  addingOrder: boolean;
  favoriteName: string | null;
}
class FavoriteButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      addingOrder: false,
      favoriteName: null
    };
  }

  render() {
    const { classes } = this.props;
    const { addingOrder, favoriteName } = this.state;
    return (
      <React.Fragment>
        <IconButton
          color="secondary"
          aria-label="Add to Favorites"
          onClick={this._onAddFavorite}
        >
          <FavoriteIcon />
        </IconButton>
        <Dialog
          open={addingOrder}
          aria-labelledby="add-favorite-title"
          onClose={this._onCancel}
        >
          <DialogTitle id="add-favorite-title">Add Favorite</DialogTitle>
          <div className={classes.dialogRoot}>
            <TextField
              id="favorite-name"
              label="Name"
              className={classes.input}
              value={favoriteName || ""}
              onChange={this._onFavoriteNameChange}
            />
            <Button onClick={this._onCommitFavorite}>Add</Button>
          </div>
        </Dialog>
      </React.Fragment>
    );
  }

  @autobind()
  private _onAddFavorite() {
    this.setState({
      addingOrder: true,
      favoriteName: ""
    });
  }

  @autobind()
  private _onCancel() {
    this.setState({
      addingOrder: false
    });
  }

  @autobind()
  private _onFavoriteNameChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      favoriteName: e.target.value
    });
  }

  @autobind()
  private async _onCommitFavorite() {
    const { order, addFavorite } = this.props;
    const { favoriteName } = this.state;
    if (!favoriteName) {
      return;
    }

    await addFavorite({
      ...order,
      favoriteName
    });

    this.setState({
      addingOrder: false
    });
  }
}
export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(FavoriteButton));
