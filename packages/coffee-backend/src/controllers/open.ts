import Router from "koa-router";

const router = new Router({ prefix: "/open" });

router.get("/", ctx => {
  ctx.body = {
    open: true
  };
});

export default router;
