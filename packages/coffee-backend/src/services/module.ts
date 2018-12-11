import { ContainerModule } from "microinject";

import Endpoint from "./Endpoint";
import Validator from "./Validator";

const containerModule = new ContainerModule(bind => {
  bind(Endpoint);
  bind(Validator);
});
export default containerModule;
