import { NextFunction, Request, Response } from "express";
import { useRequestContext } from "hooks/useRequestContext";
import { withRequestContext } from "lib/requestContext/requestContext";
import { v4 as uuid } from "uuid";

export const REQUEST_ID_KEY = "__requestId__";

/**
 * Middleware to create a request context and set the request id on the request.
 * THIS ENABLES THE USE OF HOOKS.
 */
export function requestContext() {
  return (req: Request, res: Response, next: NextFunction) => {
    withRequestContext(() => {
      useRequestContext(REQUEST_ID_KEY, uuid());
      next();
    });
  };
}

/**
 * Gets the request id for the current request.
 * @returns The request id.
 */
export function getRequestId(): string {
  const [requestId] = useRequestContext<string>(REQUEST_ID_KEY);
  if (!requestId) {
    throw new Error(
      "Request id is not defined. Ensure that the requestContext middleware is used."
    );
  }
  return requestId;
}
