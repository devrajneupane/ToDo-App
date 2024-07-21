import { UUID } from "crypto";

import { Response } from "express";
import { StatusCodes } from "http-status-codes";

import { ITask } from "../interface/Task";
import { IRequest } from "../interface/auth";
import loggerWithNameSpace from "../utils/logger";
import * as TaskService from "../service/taskService";

const logger = loggerWithNameSpace(__filename);

/**
 * Get all tasks
 *
 * @param req Request Object
 * @param res Response Object
 */
export async function getTasks(req: IRequest, res: Response) {
  const userId = req.user?.id as UUID;
  logger.info(`Getting all tasks for user ${userId}`);

  const serviceData = await TaskService.getTasks(userId);
  logger.info(`Retrived all tasks for user ${userId}`);

  res.status(StatusCodes.OK).json(serviceData);
}

/**
 * Get task by id
 *
 * @param req Request Object
 * @param res Response Object
 */
export async function getTaskById(req: IRequest, res: Response) {
  const taskId = req.params?.id as UUID;
  const userId = req.user?.id as UUID;
  logger.info(`Getting task ${taskId} for user ${userId}`);

  const serviceData = await TaskService.getTaskById(taskId, userId);
  logger.info(`Retrived task ${taskId} for user ${userId}`);

  res.status(StatusCodes.OK).send(serviceData);
}

/**
 * Create a new task
 *
 * @param req Request Object
 * @param res Response Object
 */
export async function createTask(req: IRequest, res: Response) {
  const userId = req.user?.id as UUID;
  const body: ITask = req.body;
  logger.info(`Creating new task for user ${userId}`);

  const serviceData = await TaskService.createTask(userId, body);
  logger.info(`Task created successfully`);

  res.status(StatusCodes.CREATED).send(serviceData);
}

/**
 * Update a task
 *
 * @param req Request Object
 * @param res Response Object
 */
export async function updateTask(req: IRequest, res: Response) {
  const taskId = req.params?.id as UUID;
  const userId = req.user?.id as UUID;
  const { body } = req;
  logger.info(`Updating task ${taskId}`);

  const serviceData = await TaskService.updateTask(taskId, userId, body);
  logger.info(`Task ${taskId} updated successfully`);

  res.status(StatusCodes.OK).send(serviceData);
}

/**
 * Delete a task
 *
 * @param req Request Object
 * @param res Response Object
 */
export async function deleteTask(req: IRequest, res: Response) {
  const userId = req.user?.id as UUID;
  const taskId = req.params?.id as UUID;
  logger.info(`Deleting task ${taskId}`);

  const serviceData = await TaskService.deleteTask(taskId, userId);
  logger.info(`Task ${taskId} deleted successfully`);

  res.status(StatusCodes.OK).send(serviceData);
}
