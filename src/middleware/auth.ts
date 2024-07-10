import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import config from "../config";

/**
 * Middleware to check if user is authenticated
 *
 * @param req Request
 * @param res Response
 * @param next Next function
 */
export function auth(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new Error("Unauthenticated"));
    return;
  }

  const token = authorization.split(" ");

  if (token.length !== 2 || token[0] !== "Bearer") {
    next(new Error("Unauthenticated"));
    return;
  }

  verify(token[1], config.jwt.secret!);
  next();
}
