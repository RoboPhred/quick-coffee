import * as React from "react";

import { OrderOptions, InventoryItem } from "coffee-types";

import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import ItemSource from "@/services/menu/components/ItemSource";

export interface ItemOrderOptionsProps {
  itemId: number;
  options: OrderOptions;
}
const ItemOrderOptions: React.SFC<ItemOrderOptionsProps> = ({
  itemId,
  options
}) => (
  <ItemSource itemId={itemId}>
    {({ item, isLoading }) => {
      if (isLoading) {
        return <CircularProgress />;
      }

      if (!item) {
        return null;
      }

      return (
        <table>
          <tbody>
            {optionKeys(options).map(optionId => (
              <tr key={optionId}>
                <td>
                  <Typography variant="body1">
                    {itemOptionName(item, optionId)}
                  </Typography>
                </td>
                <td>
                  <Typography variant="body2">
                    {itemOptionValue(options[optionId])}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }}
  </ItemSource>
);
export default ItemOrderOptions;

function isNullOrEmpty(x: any): boolean {
  return x == null || x === "";
}

function optionKeys(options: OrderOptions): string[] {
  return Object.keys(options).filter(
    optionId => !isNullOrEmpty(options[optionId])
  );
}

function itemOptionName(item: InventoryItem, optionKey: string) {
  if (item.options == null) {
    return optionKey;
  }
  for (const option of item.options) {
    if (option.id === optionKey) {
      return option.name;
    }
  }
  return optionKey;
}

function itemOptionValue(value: any) {
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }
  return value;
}
