import { UUID } from "crypto";

import * as TaskModel from "../model/taskModel";
import * as userModel from "../model/userModel";
import { ITask, ITodo } from "../interface/Task";
import loggerWithNameSpace from "../utils/logger";
import { IServiceResponse } from "../interface/ServiceResponse";
import { permission } from "process";

const logger = loggerWithNameSpace(__filename);

/**
 * Get all tasks
 *
 * @returns Service Response
 */
export function getTasks(userId: UUID): IServiceResponse {
  const user = userModel.getUserInfo(userId)
  const data: ITodo[] = TaskModel.getTasks(user.id, user.permissions);
  logger.info("Retreived all tasks");

  if (data.length > 0) {
    return {
      data,
    };
  } else {
    return {
      message: "No tasks found",
    };
  }
}

/**
 * Get task by id
 *
 * @param taskId Task id
 * @returns Service Response
 */
export function getTaskById(taskId: UUID, userId: UUID): IServiceResponse {
  const user = userModel.getUserInfo(userId)
  const data = TaskModel.getTaskById(taskId, userId, user.permissions);
  logger.info(`Retreived task with id ${taskId}`);

  if (data) {
    return {
      data,
    };
  } else {
    return {
      error: `Task with id ${taskId} not found`,
    };
  }
}

/**
 * Create a new task
 *
 * @param task Task object
 * @returns Service Response
 */
export function createTask(userId: UUID, task: ITask): IServiceResponse {
  const data = TaskModel.createTask(userId, task);
  logger.info("Task created successfully");

  if (data) {
    return {
      message: "Task created successfully",
      data,
    };
  } else {
    return {
      error: "Failed to create Task",
    };
  }
}

/**
 * Update a task
 *
 * @param taskId Task id
 * @param task Task object
 * @returns Service Response
 */
export function updateTask(taskId: UUID, userId: UUID, task: ITask): IServiceResponse {
  const data = TaskModel.updateTask(taskId, userId, task);
  logger.info("Task updated successfully");

  if (data) {
    return {
      message: "Task updated successfully",
      data,
    };
  } else {
    return {
      error: `Task with id ${taskId} not found`,
    };
  }
}

/**
 * Delete a task
 *
 * @param id Task id
 * @returns Service Response
 */
export function deleteTask(taskId: UUID, userId: UUID): IServiceResponse {
  const data = TaskModel.deleteTask(taskId, userId);
  logger.info("Task deleted successfully");

  if (data) {
    return {
      message: "Task deleted successfully",
      data,
    };
  } else {
    return {
      error: `Task with id ${taskId} not found`,
    };
  }
}
