import { verify } from "jsonwebtoken";
import { Response, NextFunction } from "express";

import { env } from "../config";
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
 * @throws UnauthenticatedError
 */
export function authenticate(req: IRequest, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthenticatedError("Token Not Found");
  }

  const token = authorization.split(" ");
  logger.debug(token)

  if (token.length !== 2 || token[0] !== "Bearer") {
    logger.warn("Invalid Token");
    throw new Error("Invalid Token");
  }

  verify(token[1], env.jwt.secret!, (error, data) => {
    if (error) {
      throw new UnauthenticatedError(error.message);
    }

    if (typeof data !== "string" && data) {
      req.user = data as Omit<IUser, "password">;
    }
  });
}

/**
 * Middleware to check if user is authorized
 *
 * @param permission Permission to check
 * @returns Middleware
 * @throws UnauthorizedError
 */
export function authorize(permission: ROLE | ROLE[]) {
  return (req: IRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (typeof permission === "string") {
      if (!user?.permissions.includes(permission)) {
        throw new UnauthorizedError(`User ${user?.id} is not authorized`);
      }

      logger.info("Authorized " + permission);
    } else if (typeof permission === "object") {
      const permit = permission.findIndex((role) =>
        user?.permissions.includes(role),
      );
      if (permit === -1) {
        throw new UnauthorizedError(`User ${user?.id} is not authorized`);
      }

      logger.info("Authorized " + permission[permit]);
    }
  };
}
