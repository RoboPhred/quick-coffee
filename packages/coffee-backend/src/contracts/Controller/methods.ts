import createSymbol from "../../create-symbol";

const MethodFunctions = createSymbol("controller/method-functions");
const MethodAuthorize = createSymbol("controller/method-authorize");

export interface MethodDefinition {
  method: string;
  path?: string;
}

export type MethodFunctions = Record<string | symbol, MethodDefinition[]>;

function createMethodDecorator(
  method: string
): (path?: string) => MethodDecorator {
  return (path?: string) => {
    return (target: any, propertyKey: string | symbol) => {
      let methodsPerProp = target[MethodFunctions];
      if (methodsPerProp == null) {
        methodsPerProp = target[MethodFunctions] = {};
      }

      let definitions = methodsPerProp[propertyKey];
      if (definitions == null) {
        definitions = methodsPerProp[propertyKey] = [];
      }

      definitions.push({
        method,
        path
      });
    };
  };
}

export const get = createMethodDecorator("get");
export const head = createMethodDecorator("head");
export const post = createMethodDecorator("post");
export const put = createMethodDecorator("put");
export const del = createMethodDecorator("delete");
export const options = createMethodDecorator("options");
export const trace = createMethodDecorator("trace");

export function authorize() {
  return (target: any, propertyKey: string | symbol) => {
    target[propertyKey][MethodAuthorize] = true;
  };
}

export function getMethodFunctionDefs(target: any): MethodFunctions {
  return target[MethodFunctions] || {};
}

export function getIsAuthorized(target: any) {
  return target[MethodAuthorize] || false;
}
