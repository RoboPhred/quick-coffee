import * as React from "react";

import { autobind } from "core-decorators";

import { ItemOption } from "coffee-types";

import ItemOptionPanel from "./ItemOptionPanel";
import AddOptionButton from "./AddOptionButton";

export interface ItemOptionsListProps {
  className?: string;
  options: ItemOption[];
  onChange(options: ItemOption[]): void;
}

type Props = ItemOptionsListProps;
interface State {
  expandedOption: string | null;
}
class ItemOptionsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      expandedOption: null
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
            onClick={this._onOptionClick.bind(this, option.id)}
            onChange={this._onOptionChange.bind(this, index)}
          />
        ))}
        <AddOptionButton onAddOption={this._onAddOption} />
      </div>
    );
  }

  private _onOptionClick(id: string) {
    this.setState({
      expandedOption: id
    });
  }

  private _onOptionChange(index: number, option: ItemOption) {
    const options = [...this.props.options];
    options[index] = option;
    this.props.onChange(options);
  }

  @autobind()
  private _onAddOption(option: ItemOption) {
    this.props.onChange([...this.props.options, option]);
  }
}
export default ItemOptionsList;
