import { ContainerModule } from "microinject";

import Endpoint from "./Endpoint";

const containerModule = new ContainerModule(bind => {
  bind(Endpoint);
});
export default containerModule;
