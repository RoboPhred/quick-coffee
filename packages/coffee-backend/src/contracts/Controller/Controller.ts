import { Identifier } from "microinject";

import Router from "koa-router";

import createSymbol from "../../create-symbol";

const Controller: Identifier<Controller> = createSymbol("controller");
interface Controller {
  getRouter(): Router;
}
export default Controller;
