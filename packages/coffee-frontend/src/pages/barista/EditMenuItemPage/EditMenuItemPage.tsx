import * as React from "react";

import { InventoryItem } from "coffee-types";

import { RouteComponentProps } from "react-router";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import Authenticate from "@/components/Authenticate";
import PageContainer from "@/components/PageContainer";

import PageNotFound from "@/pages/PageNotFound";

import ItemEditor from "./components/ItemEditor";

export type EditMenuItemPageProps = RouteComponentProps<{ itemId: string }>;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing.unit
    }
  });

type Props = EditMenuItemPageProps & StyleProps<ReturnType<typeof styles>>;
class EditMenuItemPage extends React.Component<Props> {
  render() {
    const {
      classes,
      match: {
        params: { itemId: itemIdParam }
      }
    } = this.props;

    const itemId = Number(itemIdParam);
    if (isNaN(itemId)) {
      return <PageNotFound />;
    }

    return (
      <Authenticate role="barista">
        <PageContainer title="Edit Menu Item" variant="subpage">
          <ItemEditor className={classes.root} itemId={itemId} />
        </PageContainer>
      </Authenticate>
    );
  }
}
export default withStyles(styles)(EditMenuItemPage);
