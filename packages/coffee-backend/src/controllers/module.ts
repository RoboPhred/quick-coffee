import { ContainerModule } from "microinject";

import LegacyController from "./LegacyController";
import MenuItemsController from "./MenuItemsController";

const containerModule = new ContainerModule(bind => {
  bind(LegacyController);
  bind(MenuItemsController);
});
export default containerModule;
