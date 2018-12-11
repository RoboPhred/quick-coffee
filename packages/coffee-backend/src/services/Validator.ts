import Ajv from "ajv";

import { JSONSchema6 } from "json-schema";

import { injectable, singleton } from "microinject";

@injectable()
@singleton()
export default class Validator {
  private readonly _ajv = new Ajv();

  validate(value: any, schema: JSONSchema6): boolean {
    // ajv caches validator functions
    let validator = this._ajv.compile(schema);
    return validator(value) as boolean;
  }
}
