import { NextFunction, Response } from "express";

import { IRequest } from "../interface/auth";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace(__filename);

export function requestLogger(req: IRequest, res: Response, next: NextFunction) {
  logger.info(`${req.method}: ${req.url}`);

  next();
}
