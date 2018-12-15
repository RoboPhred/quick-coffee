import * as React from "react";

import { InventoryItem } from "coffee-types";

export interface MenuItemEditorServiceProps {
  itemId: number;
  children(props: MenuItemEditorServiceRenderProps): React.ReactNode;
}
export interface MenuItemEditorServiceRenderProps {
  isLoading: boolean;
  isSaving: boolean;
  item: InventoryItem | null;
  onChange(item: InventoryItem): void;
  onSave(): void;
}
