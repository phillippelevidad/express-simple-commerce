import { CustomError } from "./CustomError";

/**
 * Error class for Version Mismatch errors.
 * A version mismatch error is thrown when the version specified in an update action does not match the version of the entity in the database.
 */
export class VersionMismatchError extends CustomError {
  constructor(message = "Version mismatch") {
    super(409, message);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
