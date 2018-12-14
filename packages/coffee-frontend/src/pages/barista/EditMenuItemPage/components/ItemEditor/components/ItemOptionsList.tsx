import * as React from "react";

import { ItemOption } from "coffee-types";

import { replace } from "lodash-es";

import ItemOptionPanel from "./ItemOptionPanel";

export interface ItemOptionsListProps {
  className?: string;
  options: ItemOption[];
  onChange(options: ItemOption[]): void;
}

type Props = ItemOptionsListProps;
class ItemOptionsList extends React.Component<Props> {
  render() {
    const { className, options } = this.props;
    return (
      <div className={className}>
        {options.map((option, index) => (
          <ItemOptionPanel
            key={index}
            option={option}
            onChange={this._onOptionChange.bind(this, index)}
          />
        ))}
      </div>
    );
  }

  private _onOptionChange(index: number, option: ItemOption) {
    const options = [...this.props.options];
    options[index] = option;
    this.props.onChange(options);
  }
}
export default ItemOptionsList;
