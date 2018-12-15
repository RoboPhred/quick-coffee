import { refreshMenu } from "@/services/menu/actions/refresh-menu";
import { updateMenuItem } from "@/services/menu/actions/update-menu-item";

const mapDispatchToProps = {
  refreshMenu,
  updateMenuItem
};
export default mapDispatchToProps;
export type DispatchProps = typeof mapDispatchToProps;
