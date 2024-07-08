import { ITask } from "../interfaces/Task";
import * as TaskModel from "../model/taskModel";

export function getTasks() {
  const data = TaskModel.getTasks();

  return data;
}

export function getTaskById(id: string) {
  const data = TaskModel.getTaskById(id);

  if (!data) {
    return {
      error: `Task with id: ${id} not found`,
    };
  }
  return data;
}

export function createTask(user: ITask) {
  TaskModel.createTask(user);
}

export function updateTask(id: string, task: ITask) {
  const index = TaskModel.updateTask(id, task);

  if (index === -1) {
    return {
      error: `Task with id ${id} not found`,
    };
  }
}

export function deleteTask(id: string) {
  const index = TaskModel.deleteTask(id);

  if (index === -1) {
    return {
      error: `Task with id ${id} not found`,
    };
  }
}
