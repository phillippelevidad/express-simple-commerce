import { CustomError } from "./CustomError";

/**
 * Error class for bad requests.
 * @extends CustomError
 */
export class BadRequestError extends CustomError {
  constructor(message = "Bad request") {
    super(400, message);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
