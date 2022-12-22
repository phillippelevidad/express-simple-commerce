import { CustomError } from "./CustomError";

/**
 * Error class for Not Found errors.
 */
export class NotFoundError extends CustomError {
  constructor(message = "Not found") {
    super(404, message);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
