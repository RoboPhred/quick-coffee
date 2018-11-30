import { ContainerModule } from "microinject";

import LegacyController from "./LegacyController";

const containerModule = new ContainerModule(bind => {
  bind(LegacyController);
});
export default containerModule;
