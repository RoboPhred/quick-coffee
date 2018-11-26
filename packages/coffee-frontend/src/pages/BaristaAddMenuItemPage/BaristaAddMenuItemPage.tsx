import * as React from "react";

import { autobind } from "core-decorators";

import { withRouter, RouteComponentProps } from "react-router";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Authenticate from "@/components/Authenticate";
import PageContainer from "@/components/PageContainer";

import { createItem } from "@/services/menu/api";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing.unit
    }
  });

type Props = RouteComponentProps & StyleProps<ReturnType<typeof styles>>;
interface State {
  name: string;
  description: string;
  isAddingItem: boolean;
}
class BaristaAddMenuItemPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      isAddingItem: false
    };
  }

  render() {
    const { classes } = this.props;
    const { name, description, isAddingItem } = this.state;
    return (
      <Authenticate role="barista">
        <PageContainer title="Add Menu Item" variant="subpage">
          <form className={classes.root}>
            <TextField
              id="item-name"
              label="Name"
              variant="standard"
              disabled={isAddingItem}
              value={name}
              onChange={this._onNameChanged}
            />
            <TextField
              id="item-name"
              label="Description"
              variant="standard"
              fullWidth
              disabled={isAddingItem}
              value={description}
              onChange={this._onDescriptionChanged}
            />
            <Button
              color="primary"
              disabled={isAddingItem || name === ""}
              onClick={this._onAddItem}
            >
              Add Item
            </Button>
          </form>
        </PageContainer>
      </Authenticate>
    );
  }

  @autobind()
  private _onNameChanged(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: e.target.value
    });
  }

  @autobind()
  private _onDescriptionChanged(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      description: e.target.value
    });
  }

  @autobind()
  private async _onAddItem() {
    const { name, description } = this.state;
    const { history } = this.props;
    if (name === "") {
      return;
    }

    this.setState({
      isAddingItem: true
    });

    try {
      await createItem({ name, description });
      history.push("/barista/edit-menu");
    } finally {
      this.setState({
        isAddingItem: false
      });
    }
  }
}
export default withStyles(styles)(withRouter(BaristaAddMenuItemPage));
