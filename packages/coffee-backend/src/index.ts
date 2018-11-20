require("source-map-support").install();

import Koa from "koa";
import cors from "@koa/cors";

import endpointRouter from "./endpoint";

const app = new Koa();
app.use(cors());
app.use(endpointRouter.routes());
app.use(endpointRouter.allowedMethods());
app.listen(4000);
