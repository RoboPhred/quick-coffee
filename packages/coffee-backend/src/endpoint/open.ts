import Router from "koa-router";

const router = new Router({ prefix: "/open" });

router.get("/", (ctx, next) => {
  ctx.body = {
    open: true
  };
  next();
});

export default router;
