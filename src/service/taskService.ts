import { UUID } from "crypto";

import * as TaskModel from "../model/taskModel";
import * as userModel from "../model/userModel";
import { ITask } from "../interface/Task";
import { IServiceResponse } from "../interface/ServiceResponse";

/**
 * Get all tasks
 *
 * @param userId User ID
 * @returns Service Response
 */
export async function getTasks(userId: UUID): Promise<IServiceResponse> {
  const user = await userModel.UserModel.getUserInfo(userId);
  const data = await TaskModel.TaskModel.getTasks(user.id, user.permissions);

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
export async function getTaskById(
  taskId: UUID,
  userId: UUID,
): Promise<IServiceResponse> {
  const user = await userModel.UserModel.getUserInfo(userId);
  const data = await TaskModel.TaskModel.getTaskById(
    taskId,
    userId,
    user.permissions,
  );

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
export async function createTask(
  userId: UUID,
  task: ITask,
): Promise<IServiceResponse> {
  const data = await TaskModel.TaskModel.createTask(userId, task);

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
export async function updateTask(
  taskId: UUID,
  userId: UUID,
  task: ITask,
): Promise<IServiceResponse> {
  const data = await TaskModel.TaskModel.updateTask(taskId, userId, task);

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
export async function deleteTask(taskId: UUID, userId: UUID): Promise<IServiceResponse> {
  const data = await TaskModel.TaskModel.deleteTask(taskId, userId);

  return {
    message: "Task deleted successfully",
    data,
  };
}
