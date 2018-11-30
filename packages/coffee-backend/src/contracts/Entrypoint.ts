import { Identifier } from "microinject";

import createSymbol from "../create-symbol";

const Entrypoint: Identifier<Entrypoint> = createSymbol("entrypoint");
interface Entrypoint {
  start(): void;
}
export default Entrypoint;
