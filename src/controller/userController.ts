import { UUID } from "crypto";

import HttpStatusCodes from "http-status-codes";
import { NextFunction, Request, Response } from "express";

import { IRequest } from "../interface/auth";
import { NotFound } from "../error/NotFound";
import loggerWithNameSpace from "../utils/logger";
import * as UserService from "../service/userService";
import { GetUserQuery, IUser, Params } from "../interface/User";

const logger = loggerWithNameSpace(__filename);

/**
 * Get user info
 *
 * @param req Request Object
 * @param res Response Object
 */
export async function getUserInfo(
  req: IRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.query.id ? (req.query.id as UUID) : (req.user!.id as UUID);

    const serviceData = await UserService.getUserInfo(id);

    res.status(HttpStatusCodes.OK).json(serviceData);
  } catch (error) {
    logger.error("Error getting users", { error: error });

    next(error);
  }
}

/**
 * Get all users
 *
 * @param req Request
 * @param res Response
 */
export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { body } = req;

    const serviceData = await UserService.createUser(body);

    res.status(HttpStatusCodes.CREATED).json(serviceData);
  } catch (error) {
    logger.error("Unable to create user", { error: error });

    next(error);
  }
}

/**
 * Update user
 *
 * @param req Request
 * @param res Response
 */
export async function updateUser(
  req: IRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.query?.id as UUID;
    const { body } = req;
    const serviceData = await UserService.updateUser(id, body);

    res.status(HttpStatusCodes.OK).json(serviceData);
  } catch (error) {
    logger.error("Couldn't update user", { error: error });

    next(error);
  }
}

/**
 * Delete user
 *
 * @param req Request
 * @param res Response
 */
export async function deleteUser(
  req: IRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.query.id as UUID;
    const serviceData = await UserService.deleteUser(id);

    res.status(HttpStatusCodes.OK).json(serviceData);
  } catch (error) {
    logger.error("Couldn't delete user", { error: error });

    next(error);
  }
}
