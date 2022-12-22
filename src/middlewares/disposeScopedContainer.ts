import { Request, Response, NextFunction } from "express";
import { ScopedContainer } from "lib/di/ScopedContainer";
import { getRequestId } from "./requestContext";

/**
 * Middleware to dispose the scoped DI container.
 * Use this middlware after the route handlers, before any error handlers.
 * Make sure to use the `requestContext` middleware before this one.
 */
export function disposeScopedContainer() {
  return (req: Request, res: Response, next: NextFunction) => {
    ScopedContainer.remove(getRequestId());
    next();
  };
}
