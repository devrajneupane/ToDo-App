import { Response, Request } from "express";
import { sign, verify } from "jsonwebtoken";

import config from "../config";
import * as AuthService from "../service/authService";

/**
 * Login user
 * @param req Request
 * @param res Response
 * @returns Response
 */
export async function login(req: Request, res: Response) {
  const { body } = req;

  const serviceData = await AuthService.login(body);

  if (serviceData?.error) {
    res.status(404).json(serviceData);
    return;
  }

  res.status(200).json(serviceData);
}

/**
 * Refresh access tokens
 *
 * @param req Request
 * @param res Response
 * @returns Response
 */
export async function refresh(req: Request, res: Response) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(404).json({
      error: "Token not found",
    });
    return;
  }

  const token = authorization.split(" ");

  if (token.length !== 2 || token[0] !== "Bearer") {
    res.status(404).json({
      error: "Token not found",
    });
    return;
  }

  const serviceData = await AuthService.refresh(token[1]);

  return res.status(200).json(serviceData);
}
