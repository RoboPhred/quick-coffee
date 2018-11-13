import Koa from "koa";
import cors from "@koa/cors";
import session from "koa-session";

import { SESSION_KEY } from "./config";

import endpointRouter from "./endpoint";

const app = new Koa();
app.use(cors());

// session does not play well with router, and demands
//  a top level app instance.
app.keys = [SESSION_KEY];
app.use(session(app));

app.use(endpointRouter.routes());
app.use(endpointRouter.allowedMethods());
app.listen(4000);
