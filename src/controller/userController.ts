import { Request, Response } from "express";

import * as UserService from "../service/userService";
import { GetUserQuery, IUser, Params } from "../interface/User";

/**
 * Get user info
 *
 * @param req Request
 * @param res Response
 */
export async function getUserInfo(
  req: Request<any, any, any, Params>,
  res: Response,
) {
  // TODO: get id of current logged in user
  const { id } = req.query;
  if (!id) {
    res.status(404).json({
      error: "missing id in query params",
    });
  }

  const serviceData = await UserService.getUserInfo(id!);
  res.status(200).json(serviceData);
}

/**
 * Get all users
 *
 * @param req Request
 * @param res Response
 */
export async function createUser(req: Request, res: Response) {
  const { body } = req;
  const { name, email, password } = body;

  if (!name || !email || !password) {
    res.status(404).json({
      error: "Please provide name, email and password",
    });
    return;
  }

  const data = await UserService.createUser(body);

  res.json({ data });
}

/**
 * Update user
 *
 * @param req Request
 * @param res Response
 */
export async function updateUser(
  req: Request<any, any, any, Params>,
  res: Response,
) {
  const { id } = req.query;
  const { body } = req;
  if (!id) {
    res.status(404).json({
      error: "Id is required",
    });
    return;
  }

  const serviceData = await UserService.updateUser(id, body);

  res.status(200).json({ data: serviceData });
}

/**
 * Delete user
 *
 * @param req Request
 * @param res Response
 */
export async function deleteUser(
  req: Request<any, any, any, Params>,
  res: Response,
) {
  const { id } = req.query;

  if (!id) {
    res.status(404).json({
      error: "Id is required",
    });
    return;
  }

  const serviceData = await UserService.deleteUser(id);

  res.status(200).json(serviceData);
}
