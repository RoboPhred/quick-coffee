import { injectable, provides, inject } from "microinject";

import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";

import Entrypoint from "../contracts/Entrypoint";
import Controller from "../contracts/Controller";

@injectable()
@provides(Entrypoint)
export default class Endpoint implements Endpoint {
  private _app: Koa;

  constructor(
    @inject(Controller, { all: true }) private _controllers: Controller[]
  ) {
    const app = (this._app = new Koa());
    app.use(cors());
    app.use(
      bodyParser({
        enableTypes: ["json"]
      })
    );

    for (const controller of this._controllers) {
      const router = controller.getRouter();
      app.use(router.routes());
      app.use(router.allowedMethods());
    }
  }

  start() {
    this._app.listen(4000);
  }
}
