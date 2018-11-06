import Koa from "koa";

import endpointRouter from "./endpoint";

const app = new Koa();
app.use(endpointRouter.routes());
app.use(endpointRouter.allowedMethods());
app.listen(4000);
