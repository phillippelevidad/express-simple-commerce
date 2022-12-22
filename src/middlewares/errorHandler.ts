/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response, NextFunction } from "express";
import { CustomError } from "lib/errors/CustomError";
import { isDev } from "services/common/helpers/isDev";

/**
 * Middleware to handle errors and generate standard JSON error messages.
 */
export function errorHandler() {
  return (err: Error, req: Request, res: Response, nxt: NextFunction) => {
    if (err instanceof CustomError)
      return res.status(err.statusCode).send({ errors: err.serializeErrors() });

    res.status(500).send({
      errors: [
        {
          message: isDev() ? err.stack ?? err.message : "Something went wrong",
        },
      ],
    });
  };
}
