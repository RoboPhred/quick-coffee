import { composeModules } from "microinject";

import servicesModule from "./services/module";

const containerModule = composeModules(servicesModule);

export default containerModule;
