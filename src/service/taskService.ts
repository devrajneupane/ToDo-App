import * as TaskModel from "../model/taskModel";
import { ITask, ITodo } from "../interfaces/Task";
import { IServiceResponse } from "../interfaces/ServiceResponse";

/**
 * Get all tasks
 *
 * @returns Service Response
 */
export function getTasks(): IServiceResponse {
  const data: ITodo[] = TaskModel.getTasks();

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
 * @param id Task id
 * @returns Service Response
 */
export function getTaskById(id: string): IServiceResponse {
  const data = TaskModel.getTaskById(id);

  if (data) {
    return {
      data,
    };
  } else {
    return {
      error: `Task with id ${id} not found`,
    };
  }
}

/**
 * Create a new task
 *
 * @param task Task object
 * @returns Service Response
 */
export function createTask(task: ITask): IServiceResponse {
  const data = TaskModel.createTask(task);

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
 * @param id Task id
 * @param task Task object
 * @returns Service Response
 */
export function updateTask(id: string, task: ITask): IServiceResponse {
  const data = TaskModel.updateTask(id, task);

  if (data) {
    return {
      message: "Task updated successfully",
      data,
    };
  } else {
    return {
      error: `Task with id ${id} not found`,
    };
  }
}

/**
 * Delete a task
 *
 * @param id Task id
 * @returns Service Response
 */
export function deleteTask(id: string): IServiceResponse {
  const data = TaskModel.deleteTask(id);

  if (data) {
    return {
      message: "Task deleted successfully",
      data,
    };
  } else {
    return {
      error: `Task with id ${id} not found`,
    };
  }
}
