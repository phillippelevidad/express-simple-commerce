/**
 * CustomError is an abstract class that extends the built-in Error class.
 * It is used by the `errorHandler` middleware to generate standard JSON error messages.
 */
export abstract class CustomError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
