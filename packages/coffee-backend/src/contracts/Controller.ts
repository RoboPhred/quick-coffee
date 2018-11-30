import { Identifier } from "microinject";

import Router from "koa-router";

import createSymbol from "../createSymbol";

const Controller: Identifier<Controller> = createSymbol("controller");
interface Controller {
  getRouter(): Router;
}
export default Controller;
