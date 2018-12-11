import { injectable, provides } from "microinject";
import Controller, { get } from "../contracts/Controller";

@injectable()
@provides(Controller)
export default class StoreStatusController {
  @get("/open")
  private _getStoreIsOpen() {
    return { open: true };
  }
}
