import { NextFunction, Response } from "express";
import HttpStatusCodes from "http-status-codes";

import { IRequest } from "../interface/auth";
import { UnauthenticatedError } from "../error/UnauthenticatedErrors";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace(__filename);

export function notFoundError(req: IRequest, res: Response) {
  return res.status(HttpStatusCodes.NOT_FOUND).json({
    message: "Not Found",
  });
}

export function genericErrorHandler(
  error: Error,
  req: IRequest,
  res: Response,
  next: NextFunction,
) {
  if (error.stack) {
    logger.error(error.stack);
  }

  if (error instanceof UnauthenticatedError) {
    return res.status(HttpStatusCodes.UNAUTHORIZED).json({
      message: error.message,
    });
  }
  return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
  });
}
