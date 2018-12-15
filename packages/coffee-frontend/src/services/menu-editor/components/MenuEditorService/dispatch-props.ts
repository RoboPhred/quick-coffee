import { push } from "connected-react-router";

import { refreshMenu } from "@/services/menu/actions/refresh-menu";
import { deleteMenuItem } from "@/services/menu/actions/delete-menu-item";

const mapDispatchToProps = {
  pushUrl: push,
  refreshMenu,
  deleteMenuItem
};
export default mapDispatchToProps;
export type DispatchProps = typeof mapDispatchToProps;
