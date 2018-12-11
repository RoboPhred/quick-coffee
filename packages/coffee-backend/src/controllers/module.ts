import { ContainerModule } from "microinject";

import FavoritesController from "./FavoritesController";
import LegacyController from "./LegacyController";
import MenuItemsController from "./MenuItemsController";
import StoreStatusController from "./StoreStatusController";

const containerModule = new ContainerModule(bind => {
  bind(FavoritesController);
  bind(LegacyController);
  bind(MenuItemsController);
  bind(StoreStatusController);
});
export default containerModule;
