import { Request, Response, NextFunction } from "express";
import { useCurrentTenant } from "hooks/useCurrentTenant";

/**
 * Middleware to set the current tenant on the request.
 * Get the tenant id by invoking the `useCurrentTenant` hook.
 * Make sure to use the `requestContext` middleware before this one.
 */
export function currentTenant() {
  return (req: Request, res: Response, next: NextFunction) => {
    useCurrentTenant({
      // TODO: Get the tenant id from the auth token
      id: req.header("x-tenantid") ?? "639e3410f5f5d1d0884abeec",
    });
    next();
  };
}
