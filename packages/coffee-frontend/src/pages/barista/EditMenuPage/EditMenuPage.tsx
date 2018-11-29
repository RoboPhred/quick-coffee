import * as React from "react";
import { connect } from "react-redux";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";

import DeleteIcon from "@material-ui/icons/Delete";

import ItemListSource from "@/services/menu/components/ItemListSource";
import { deleteMenuItem } from "@/services/menu/actions/delete-menu-item";

import Authenticate from "@/components/Authenticate";
import LoadingPageContent from "@/components/LoadingPageContent";
import PageContainer from "@/components/PageContainer";
import ButtonLink from "@/components/ButtonLink";

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

const mapDispatchToProps = {
  deleteMenuItem
};
type DispatchProps = typeof mapDispatchToProps;

type Props = DispatchProps & StyleProps<ReturnType<typeof styles>>;
class EditMenuPage extends React.Component<Props> {
  render() {
    const { classes, deleteMenuItem } = this.props;
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
                              // TODO: Remove lambda prop.
                              onClick={() => deleteMenuItem(item.id)}
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
export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(EditMenuPage)
);
