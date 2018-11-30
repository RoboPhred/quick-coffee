import { Identifier } from "microinject";

import createSymbol from "../createSymbol";

const Entrypoint: Identifier<Entrypoint> = createSymbol("entrypoint");
interface Entrypoint {
  start(): void;
}
export default Entrypoint;
