import { CustomError } from "./CustomError";

/**
 * Error class for when a tenant is not indentified in the request.
 */
export class UnindentifiedTenantError extends CustomError {
  constructor(message = "Unindentified tenant") {
    super(403, message);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
