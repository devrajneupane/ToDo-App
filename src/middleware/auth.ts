import { verify } from "jsonwebtoken";
import { Response, NextFunction } from "express";

import config from "../config";
import { ROLE } from "../enums/Role";
import { IUser } from "../interface/User";
import { IRequest } from "../interface/auth";
import loggerWithNameSpace from "../utils/logger";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { UnauthenticatedError } from "../error/UnauthenticatedErrors";

const logger = loggerWithNameSpace(__filename);

/**
 * Middleware to check if user is authenticated
 *
 * @param req Request
 * @param res Response
 * @param next Next function
 */
export function authenticate(req: IRequest, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      next(new UnauthenticatedError("Token Not Found"));
      return;
    }

    const token = authorization.split(" ");

    if (token.length !== 2 || token[0] !== "Bearer") {
      logger.warn("Invalid Token");
      next(new Error("Invalid Token"));
      return;
    }

    const user = verify(token[1], config.jwt.secret!) as IUser;
    req.user = user;
  } catch (error) {
    logger.warn("User is not Authenticated");
    next(new UnauthenticatedError("User is not Authenticated"));
  }

  next();
}

/**
 * Middleware to check if user is authorized
 *
 * @param permission Permission to check
 */
export function authorize(permission: ROLE | ROLE[]) {
  return (req: IRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    try {
      if (typeof permission == "string") {
        if (!user?.permissions.includes(permission)) {
          logger.error(`User ${user} is not authorized`);
          next(new UnauthorizedError(`User ${user} is not authorized`));
        }

        logger.info("authorize " + permission);
      } else if (typeof permission == "object") {
        const permit = permission.findIndex((predicate) =>
          user?.permissions.includes(predicate),
        );
        if (permit == -1) {
          next(new UnauthorizedError("Unauthorized"));
        }

        logger.info("authorize " + permission[permit]);
      }
    } catch (error) {
      logger.error("Permission failed");
      next(new UnauthorizedError("Permission failed"));
    }

    next();
  };
}
