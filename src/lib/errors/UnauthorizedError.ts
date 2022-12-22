import { CustomError } from "./CustomError";

/**
 * Error class for Unauthorized errors.
 */
export class UnauthorizedError extends CustomError {
  constructor(message = "Unauthorized") {
    super(401, message);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
