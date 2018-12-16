import * as React from "react";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";

import MenuEditorService from "@/services/menu-editor/components/MenuEditorService";

import Authenticate from "@/components/Authenticate";
import LoadingPageContent from "@/components/LoadingPageContent";
import PageContainer from "@/components/PageContainer";
import ButtonLink from "@/components/ButtonLink";

import MenuItemListItem from "./components/MenuItemListItem";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%"
    },
    menuList: {
      flexGrow: 1,
      width: "100%",
      height: "100%",
      overflow: "auto",
      minHeight: 0
    },
    actionBar: {
      display: "flex",
      flexDirection: "row",
      flexGrow: 0,
      flexShrink: 1,
      justifyContent: "flex-end",
      padding: theme.spacing.unit,
      height: 9 * theme.spacing.unit
    }
  });

type Props = StyleProps<typeof styles>;
class EditMenuPage extends React.Component<Props> {
  render() {
    const { classes } = this.props;
    return (
      <Authenticate role="barista">
        <MenuEditorService>
          {({ isLoading, items }) => (
            <PageContainer title="Edit Menu" variant="barista">
              <div className={classes.root}>
                <div className={classes.menuList}>
                  {isLoading && <LoadingPageContent />}
                  {items.length > 0 && (
                    <List>
                      {items.map(item => (
                        // TODO remove lambda prop.
                        <MenuItemListItem
                          key={item.id}
                          itemName={item.name}
                          onClick={item.editItem}
                          onDelete={item.deleteItem}
                        />
                      ))}
                    </List>
                  )}
                </div>
                <Divider />
                <div className={classes.actionBar}>
                  <ButtonLink to="/barista/edit-menu/add-item">
                    Add Item
                  </ButtonLink>
                </div>
              </div>
            </PageContainer>
          )}
        </MenuEditorService>
      </Authenticate>
    );
  }
}
export default withStyles(styles)(EditMenuPage);
