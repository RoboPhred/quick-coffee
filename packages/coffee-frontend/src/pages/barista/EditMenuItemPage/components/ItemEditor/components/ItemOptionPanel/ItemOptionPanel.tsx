import * as React from "react";

import { autobind } from "core-decorators";

import { ItemOption } from "coffee-types";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import BooleanItemOptionDetails from "./components/BooleanItemOptionDetails";
import IntegerItemOptionDetails from "./components/IntegerItemOptionDetails";
import SelectItemOptionDetails from "./components/SelectItemOptionDetails";
import TextItemOptionDetails from "./components/TextItemOptionDetails";

const itemTypeOptions: Record<
  ItemOption["type"],
  React.ComponentType<{
    option: any;
    onChange(option: any): void;
  }>
> = {
  boolean: BooleanItemOptionDetails,
  integer: IntegerItemOptionDetails,
  select: SelectItemOptionDetails,
  text: TextItemOptionDetails
};

export interface ItemOptionPanelProps {
  expanded: boolean;
  option: ItemOption;
  onClick(): void;
  onChange(option: ItemOption): void;
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

type Props = ItemOptionPanelProps & StyleProps<typeof styles>;
class ItemOptionPanel extends React.Component<Props> {
  render() {
    const { classes, option, expanded, onClick } = this.props;
    const TypeDetails = itemTypeOptions[option.type];
    return (
      <ExpansionPanel key={option.id} expanded={expanded} onClick={onClick}>
        <ExpansionPanelSummary expandIcon={expandIcon}>
          <div className={classes.column}>
            <Typography className={classes.heading}>{option.name}</Typography>
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
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              defaultValue={option.name}
              onChange={this._onNameChange}
            />
            <TextField
              id="option-description"
              label="Description"
              variant="standard"
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
              defaultValue={option.description || ""}
              onChange={this._onDescriptionChange}
            />
            {TypeDetails && (
              <TypeDetails option={option} onChange={this._onDetailsChange} />
            )}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }

  @autobind()
  private _onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    const { option, onChange } = this.props;
    onChange({
      ...option,
      name
    });
  }

  @autobind()
  private _onDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    const description = e.target.value;
    const { option, onChange } = this.props;
    onChange({
      ...option,
      description
    });
  }

  @autobind()
  private _onDetailsChange(details: any) {
    const { option, onChange } = this.props;
    onChange({
      ...option,
      ...details
    });
  }
}
export default withStyles(styles)(ItemOptionPanel);
