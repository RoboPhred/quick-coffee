import * as React from "react";

import { ItemOption } from "coffee-types";

import ItemOptionPanel from "./ItemOptionPanel";

export interface ItemOptionsListProps {
  className?: string;
  options: ItemOption[];
}

type Props = ItemOptionsListProps;
class ItemOptionsList extends React.Component<Props> {
  render() {
    const { className, options } = this.props;
    return (
      <div className={className}>
        {options.map(option => (
          <ItemOptionPanel option={option} />
        ))}
      </div>
    );
  }
}
export default ItemOptionsList;
