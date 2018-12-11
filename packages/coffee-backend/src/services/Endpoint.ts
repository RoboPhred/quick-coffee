import { injectable, provides, inject } from "microinject";

import Koa, { Context } from "koa";
import cors from "@koa/cors";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";

import Entrypoint from "../contracts/Entrypoint";
import Controller, {
  getMethodFunctionDefs,
  getMethodArgumentDefs,
  MethodDefinition
} from "../contracts/Controller";

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
      const router = this._createRouter(controller);
      app.use(router.routes());
      app.use(router.allowedMethods());
    }
  }

  start() {
    this._app.listen(4000);
  }

  private _createRouter(controller: Controller): Router {
    if (controller.getRouter) {
      return controller.getRouter();
    }

    const router = new Router();
    const methodDefs = getMethodFunctionDefs(controller);
    for (const methodName of Object.keys(methodDefs)) {
      const method = (controller as any)[methodName];
      const defs = methodDefs[methodName];
      for (const def of defs) {
        this._wireMethod(method, def, router, controller);
      }
    }
    return router;
  }

  private _wireMethod(
    handler: Function,
    def: MethodDefinition,
    router: Router,
    target: any
  ) {
    let { method, path = "/" } = def;
    path = formatPath(path);

    switch (method) {
      case "get":
      case "head":
      case "post":
      case "put":
      case "delete":
      case "options":
      case "trace": {
        const managedHandler = this._createHandler(handler, target);
        (router as any)[method](path, managedHandler as any);
        break;
      }
      default:
        throw new Error(
          `Unsupported method "${method}" on handler "${handler.name}"`
        );
    }
  }

  private _createHandler(handler: Function, target: any): Function {
    const defs = getMethodArgumentDefs(handler);
    if (defs.length === 0 && handler.length > 0) {
      // No decorators but parameters, this is a typical express / koa handler.
      return handler;
    }

    return async (ctx: Context, next: () => Promise<any>) => {
      const args = defs.map(x => {
        switch (x.type) {
          case "body":
            return ctx.request.body;
          case "param":
            return ctx.params[x.paramId];
        }
      });

      let result: any;
      result = handler.apply(target, args);

      if (result instanceof Promise) {
        result = await result;
      }

      ctx.body = result;
    };
  }
}

function formatPath(path: string): string {
  if (path.startsWith("/")) {
    return path;
  }
  return `/${path}`;
}
