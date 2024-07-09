import { Request, Response } from "express";

import { ITask } from "../interface/Task";
import * as TaskService from "../service/taskService";

/**
 * Get all tasks
 *
 * @param req Request Object
 * @param res Response Object
 */
export function getTasks(req: Request, res: Response) {
  const serviceData = TaskService.getTasks();
  if (serviceData.data) {
    res.status(200).send(serviceData);
  } else {
    res.status(404).send(serviceData);
  }
}

/**
 * Get task by id
 *
 * @param req Request Object
 * @param res Response Object
 */
export function getTaskById(req: Request, res: Response) {
  const { id } = req.params;
  const serviceData = TaskService.getTaskById(id);

  if (serviceData.data) {
    res.status(200).send(serviceData);
  } else {
    res.status(404).send(serviceData);
  }
}

/**
 * Create a new task
 *
 * @param req Request Object
 * @param res Response Object
 */
export function createTask(req: Request, res: Response) {
  const body: ITask = req.body;

  if (Object.keys(body).length === 0) {
    res.status(404).send({
      error: "Task is missing",
    });
    return;
  }

  const serviceData = TaskService.createTask(body);

  if (serviceData.data) {
    res.status(201).send(serviceData);
  } else {
    res.status(404).send(serviceData);
  }
}

/**
 * Update a task
 *
 * @param req Request Object
 * @param res Response Object
 */
export function updateTask(req: Request, res: Response) {
  const { id } = req.params;
  const { body } = req;
  const serviceData = TaskService.updateTask(id, body);

  if (serviceData.data) {
    res.status(200).send(serviceData);
  } else {
    res.status(404).send(serviceData);
  }
}

/**
 * Delete a task
 *
 * @param req Request Object
 * @param res Response Object
 */
export function deleteTask(req: Request, res: Response) {
  const { id } = req.params;
  const serviceData = TaskService.deleteTask(id);

  if (serviceData.data) {
    res.status(200).send(serviceData);
  } else {
    res.status(404).send(serviceData);
  }
}
