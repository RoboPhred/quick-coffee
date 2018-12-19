/**
 * Properties passed to a component when withStyles is used.
 */
type StyleProps<T> = T extends (theme: any) => infer R
  ? ObjStyleProps<R>
  : ObjStyleProps<T>;
type ObjStyleProps<T> = { classes: { [K in keyof T]: string } };

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

declare const __webpack_public_path__: string;

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
}

declare module "*.svg" {
  const path: string;
  export = path;
}
