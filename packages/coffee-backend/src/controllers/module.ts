import { ContainerModule } from "microinject";

import LegacyController from "./LegacyController";
import MenuItemsController from "./MenuItemsController";
import StoreStatusController from "./StoreStatusController";

const containerModule = new ContainerModule(bind => {
  bind(LegacyController);
  bind(MenuItemsController);
  bind(StoreStatusController);
});
export default containerModule;
