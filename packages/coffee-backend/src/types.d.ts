declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

declare module "@koa/cors" {
  import { Middleware } from "koa";
  interface CorsOptions {
    origin?: string;
  }
  function cors(options?: CorsOptions): Middleware;
  export = cors;
}
