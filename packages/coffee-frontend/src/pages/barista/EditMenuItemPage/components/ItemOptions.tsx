import * as React from "react";

import { ItemOption } from "coffee-types";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import BooleanItemOptionDetails from "./BooleanItemOptionDetails";
import IntegerItemOptionDetails from "./IntegerItemOptionDetails";
import SelectItemOptionDetails from "./SelectItemOptionDetails";
import TextItemOptionDetails from "./TextItemOptionDetails";

export interface ItemOptionsProps {
  className?: string;
  options: ItemOption[];
}

const expandIcon = <ExpandMoreIcon />;

const styles = (theme: Theme) =>
  createStyles({
    column: {
      flexBasis: "33.33%"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15)
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary
    }
  });

const itemTypeOptions: Record<
  ItemOption["type"],
  React.ComponentClass<{ option: any }>
> = {
  boolean: BooleanItemOptionDetails,
  integer: IntegerItemOptionDetails,
  select: SelectItemOptionDetails,
  text: TextItemOptionDetails
};

type Props = ItemOptionsProps & StyleProps<ReturnType<typeof styles>>;
class ItemOptions extends React.Component<Props> {
  render() {
    const { className, classes, options } = this.props;
    return (
      <div className={className}>
        {options.map(option => {
          const TypeDetails = itemTypeOptions[option.type];
          return (
            <ExpansionPanel key={option.id}>
              <ExpansionPanelSummary expandIcon={expandIcon}>
                <div className={classes.column}>
                  <Typography className={classes.heading}>
                    {option.name}
                  </Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.secondaryHeading}>
                    {option.type}
                  </Typography>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div>
                  <TextField
                    id="option-name"
                    label="Name"
                    variant="standard"
                    defaultValue={option.name}
                  />
                  <TextField
                    id="option-description"
                    label="Description"
                    variant="standard"
                    fullWidth
                    defaultValue={option.description || ""}
                  />
                  {TypeDetails && <TypeDetails option={option} />}
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
      </div>
    );
  }
}
export default withStyles(styles)(ItemOptions);
