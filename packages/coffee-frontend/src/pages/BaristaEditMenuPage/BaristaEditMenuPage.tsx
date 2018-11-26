import * as React from "react";

import { autobind } from "core-decorators";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";

import DeleteIcon from "@material-ui/icons/Delete";

import ItemListSource from "@/services/menu/components/ItemListSource";

import Authenticate from "@/components/Authenticate";
import LoadingPageContent from "@/components/LoadingPageContent";
import PageContainer from "@/components/PageContainer";
import ButtonLink from "@/components/ButtonLink";

import { deleteItem } from "@/services/menu/api";

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
type Props = StyleProps<ReturnType<typeof styles>>;
class BaristaEditMenuPage extends React.Component<Props> {
  render() {
    const { classes } = this.props;
    return (
      <Authenticate role="barista">
        <PageContainer title="Edit Menu" variant="barista">
          <div className={classes.root}>
            <ItemListSource>
              {({ isLoading, items }) => (
                <div className={classes.menuList}>
                  {isLoading && <LoadingPageContent />}
                  {items && (
                    <List>
                      {items.map(item => (
                        <ListItem key={item.id} button>
                          <ListItemText>{item.name}</ListItemText>
                          <ListItemSecondaryAction>
                            <IconButton
                              aria-label="Delete"
                              // TODO: Remove lambda prop.  Convert to redux action
                              onClick={() => deleteItem(item.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  )}
                </div>
              )}
            </ItemListSource>
            <Divider />
            <div className={classes.actionBar}>
              <ButtonLink to="/barista/edit-menu/add-item">Add Item</ButtonLink>
            </div>
          </div>
        </PageContainer>
      </Authenticate>
    );
  }
}
export default withStyles(styles)(BaristaEditMenuPage);
