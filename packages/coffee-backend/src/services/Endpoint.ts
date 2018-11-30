import { injectable, provides } from "microinject";

import Koa from "koa";
import cors from "@koa/cors";

import Entrypoint from "../contracts/Entrypoint";

import endpointRouter from "../controllers";

@injectable()
@provides(Entrypoint)
export default class Endpoint {
  private _app: Koa;

  constructor() {
    const app = (this._app = new Koa());
    app.use(cors());
    app.use(endpointRouter.routes());
    app.use(endpointRouter.allowedMethods());
  }

  start() {
    this._app.listen(4000);
  }
}
