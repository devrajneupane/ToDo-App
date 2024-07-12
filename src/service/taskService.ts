import { UUID } from "crypto";

import * as TaskModel from "../model/taskModel";
import * as userModel from "../model/userModel";
import { ITask, ITodo } from "../interface/Task";
import { IServiceResponse } from "../interface/ServiceResponse";

/**
 * Get all tasks
 *
 * @param userId User ID
 * @returns Service Response
 */
export function getTasks(userId: UUID): IServiceResponse {
  const user = userModel.getUserInfo(userId);
  const data: ITodo[] = TaskModel.getTasks(user.id, user.permissions);

  return {
    message: "Tasks retrieved successfully",
    data,
  };
}

/**
 * Get task by id
 *
 * @param taskId Task id
 * @returns Service Response
 */
export function getTaskById(taskId: UUID, userId: UUID): IServiceResponse {
  const user = userModel.getUserInfo(userId);
  const data = TaskModel.getTaskById(taskId, userId, user.permissions);

  return {
    message: "Task retrieved successfully",
    data,
  };
}

/**
 * Create a new task
 *
 * @param task Task object
 * @returns Service Response
 */
export function createTask(userId: UUID, task: ITask): IServiceResponse {
  const data = TaskModel.createTask(userId, task);

  return {
    message: "Task created successfully",
    data,
  };
}

/**
 * Update a task
 *
 * @param taskId Task id
 * @param task Task object
 * @returns Service Response
 */
export function updateTask(
  taskId: UUID,
  userId: UUID,
  task: ITask,
): IServiceResponse {
  const data = TaskModel.updateTask(taskId, userId, task);

  return {
    message: "Task updated successfully",
    data,
  };
}

/**
 * Delete a task
 *
 * @param id Task id
 * @returns Service Response
 */
export function deleteTask(taskId: UUID, userId: UUID): IServiceResponse {
  const data = TaskModel.deleteTask(taskId, userId);

  return {
    message: "Task deleted successfully",
    data,
  };
}
