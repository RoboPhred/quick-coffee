import createSymbol from "../../create-symbol";

const MethodArguments = createSymbol("controller/method-arguments");

export type MethodArgDefinition =
  | BodyMethodArgDefinition
  | ParamMethodArgDefinition;

export interface BodyMethodArgDefinition {
  type: "body";
}
export interface ParamMethodArgDefinition {
  type: "param";
  paramId: string;
}

export type MethodArguments = MethodArgDefinition[];

export function body(): ParameterDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) => {
    const func = target[propertyKey];
    const args = getMethodArgumentDefs(func, true);
    args[parameterIndex] = { type: "body" };
  };
}

export function param(id: string): ParameterDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) => {
    const func = target[propertyKey];
    const args = getMethodArgumentDefs(func, true);
    const def: ParamMethodArgDefinition = {
      type: "param",
      paramId: id
    };
    args[parameterIndex] = def;
  };
}

export function getMethodArgumentDefs(
  target: any,
  create?: boolean
): MethodArguments {
  let methods = target[MethodArguments];
  if (!methods && create) {
    methods = target[MethodArguments] = [];
  }

  return methods || [];
}
