import * as React from "react";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import MenuItemEditorService from "@/services/menu-editor/components/MenuItemEditorService";

import LoadingPageContent from "@/components/LoadingPageContent";

import ItemDetails from "./components/ItemDetails";
import ItemOptionsList from "./components/ItemOptionsList";

export interface ItemEditorProps {
  className?: string;
  itemId: number;
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
    const { className, classes, itemId } = this.props;
    return (
      <MenuItemEditorService itemId={itemId}>
        {({ isLoading, item, onChange, onSave }) => (
          <div className={`${className} ${classes.root}`}>
            {isLoading && <LoadingPageContent />}
            {item && (
              <React.Fragment>
                <div className={classes.form}>
                  <ItemDetails item={item} onChange={onChange} />
                  <ItemOptionsList
                    className={classes.options}
                    options={item.options || []}
                    onChange={options => onChange({ ...item, options })}
                  />
                </div>
                <div className={classes.actions}>
                  <Button color="primary" onClick={onSave}>
                    Save Changes
                  </Button>
                </div>
              </React.Fragment>
            )}
          </div>
        )}
      </MenuItemEditorService>
    );
  }
}
export default withStyles(styles)(ItemEditor);
