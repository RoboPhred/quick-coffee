export class HttpError extends Error {
  code: number;
  status: number;
  message: string;
  expose: boolean;

  constructor(statusCode: number, statusMessage: string) {
    super(statusMessage);
    this.code = statusCode;
    this.status = statusCode;
    this.message = statusMessage;
    this.expose = true;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
