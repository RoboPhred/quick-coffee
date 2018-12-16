import * as React from "react";

import { ItemOption } from "coffee-types";

import ItemOptionPanel from "./ItemOptionPanel";

export interface ItemOptionsListProps {
  className?: string;
  options: ItemOption[];
  onChange(options: ItemOption[]): void;
}

type Props = ItemOptionsListProps;
interface State {
  expandedOption: string;
}
class ItemOptionsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      expandedOption: (props.options[0] || { id: "" }).id
    };
  }

  render() {
    const { className, options } = this.props;
    const { expandedOption } = this.state;
    return (
      <div className={className}>
        {options.map((option, index) => (
          <ItemOptionPanel
            key={option.id}
            option={option}
            expanded={expandedOption === option.id}
            onClick={() => this.setState({ expandedOption: option.id })}
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
