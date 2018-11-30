import createSymbol from "../../create-symbol";

const MethodArguments = createSymbol("controller/method-arguments");

/** @internal */
export type MethodArgType = "body";

/** @internal */
export interface MethodArgDefinition {
  type: MethodArgType;
}

/** @internal */
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

/** @internal */
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
