import { Request, Response, NextFunction } from "express";
import { useCurrentUser } from "hooks/useCurrentUser";

/**
 * Middleware to set the current user on the request.
 * Get the user id by invoking the `useCurrentUser` hook.
 * Make sure to use the `requestContext` middleware before this one.
 */
export function currentUser() {
  return (req: Request, res: Response, next: NextFunction) => {
    useCurrentUser({
      // TODO: Get the user id from the auth token
      id: req.header("x-userid") ?? "639bc79418063f2751e2ca43",
    });
    next();
  };
}
