import { composeModules } from "microinject";

import controllersModule from "./controllers/module";
import servicesModule from "./services/module";

const containerModule = composeModules(controllersModule, servicesModule);

export default containerModule;
