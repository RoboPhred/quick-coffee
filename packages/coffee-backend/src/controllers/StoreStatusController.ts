import { injectable, provides, singleton } from "microinject";

import Controller, { get } from "../contracts/Controller";

@injectable()
@provides(Controller)
@singleton()
export default class StoreStatusController {
  @get("/open")
  private _getStoreIsOpen() {
    return { open: true };
  }
}
