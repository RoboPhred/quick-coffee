import * as React from "react";

import { RouteComponentProps } from "react-router";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";

import ItemSource from "@/services/menu/components/ItemSource";

import Authenticate from "@/components/Authenticate";
import PageContainer from "@/components/PageContainer";
import LoadingPageContent from "@/components/LoadingPageContent";

import ItemOptions from "./components/ItemOptions";

export type EditMenuItemPageProps = RouteComponentProps<{ itemId: string }>;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing.unit
    },
    options: {
      marginTop: theme.spacing.unit
    }
  });

type Props = EditMenuItemPageProps & StyleProps<ReturnType<typeof styles>>;
class EditMenuItemPage extends React.Component<Props> {
  render() {
    const {
      classes,
      match: {
        params: { itemId }
      }
    } = this.props;

    return (
      <Authenticate role="barista">
        <PageContainer title="Edit Menu Item" variant="subpage">
          <ItemSource itemId={Number(itemId)}>
            {({ isLoading, item }) => (
              <div className={classes.root}>
                {isLoading && <LoadingPageContent />}
                {item && (
                  <form>
                    <TextField
                      id="item-name"
                      label="Name"
                      variant="standard"
                      defaultValue={item.name}
                    />
                    <TextField
                      id="item-name"
                      label="Description"
                      variant="standard"
                      fullWidth
                      defaultValue={item.description || ""}
                    />
                    <ItemOptions
                      className={classes.options}
                      options={item.options || []}
                    />
                  </form>
                )}
              </div>
            )}
          </ItemSource>
        </PageContainer>
      </Authenticate>
    );
  }
}
export default withStyles(styles)(EditMenuItemPage);
