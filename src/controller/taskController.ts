import { UUID } from "crypto";

import { Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";

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
export function getTasks(req: IRequest, res: Response) {
  try {
    const userId = req.user?.id as UUID;
    const serviceData = TaskService.getTasks(userId);

    res.status(HttpStatusCodes.OK).json(serviceData);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    } else {
      logger.error("An unexpected error occurred");
    }
  }
}

/**
 * Get task by id
 *
 * @param req Request Object
 * @param res Response Object
 */
export function getTaskById(req: IRequest, res: Response) {
  try {
    const taskId = req.params?.id as UUID;
    const userId = req.user?.id as UUID;
    const serviceData = TaskService.getTaskById(taskId, userId);

    res.status(HttpStatusCodes.OK).send(serviceData);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    } else {
      logger.error("An unexpected error occurred");
    }
  }
}

/**
 * Create a new task
 *
 * @param req Request Object
 * @param res Response Object
 */
export function createTask(req: IRequest, res: Response) {
  try {
    const userId = req.user?.id as UUID;
    const body: ITask = req.body;
    if (Object.keys(body).length === 0) {
      res.status(HttpStatusCodes.NOT_FOUND).send({
        error: "Task details is missing",
      });
      return;
    }
    const serviceData = TaskService.createTask(userId, body);
    if (serviceData.data) {
      res.status(HttpStatusCodes.CREATED).send(serviceData);
    } else {
      res.status(HttpStatusCodes.BAD_REQUEST).send(serviceData);
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    } else {
      logger.error("An unexpected error occurred");
    }
  }
}

/**
 * Update a task
 *
 * @param req Request Object
 * @param res Response Object
 */
export function updateTask(req: IRequest, res: Response) {
  try {
    const taskId = req.params?.id as UUID;
    const userId = req.user?.id as UUID;
    const { body } = req;
    const serviceData = TaskService.updateTask(taskId, userId, body);

    if (serviceData.data) {
      res.status(HttpStatusCodes.OK).send(serviceData);
    } else {
      res.status(HttpStatusCodes.BAD_REQUEST).send(serviceData);
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    } else {
      logger.error("An unexpected error occurred");
    }
  }
}

/**
 * Delete a task
 *
 * @param req Request Object
 * @param res Response Object
 */
export function deleteTask(req: IRequest, res: Response) {
  try {
    const userId = req.user?.id as UUID;
    const taskId = req.params?.id as UUID;
    const serviceData = TaskService.deleteTask(taskId, userId);

    if (serviceData.data) {
      res.status(HttpStatusCodes.OK).send(serviceData);
    } else {
      res.status(HttpStatusCodes.BAD_REQUEST).send(serviceData);
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    } else {
      logger.error("An unexpected error occurred");
    }
  }
}
