declare module "@koa/cors" {
  import { Middleware } from "koa";
  interface CorsOptions {
    origin?: string;
  }
  function cors(options?: CorsOptions): Middleware;
  export = cors;
}
