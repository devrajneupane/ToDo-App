import * as path from "path";

import { ITask, ITodo } from "../interface/Task";
import { TASK_STATUS } from "../enums/TaskStatus";
import { readJsonFile, writeJsonFile } from "../utils/utils";

const filePath = path.resolve(__dirname, "../../data/tasks.json");
let tasks: ITodo[] = [];

readJsonFile(filePath)
  .then((jsonData) => {
    tasks = jsonData;
  })
  .catch((err) => {
    console.error("Error reading JSON file:", err);
  });

/**
 * Get all tasks
 */
export function getTasks(): ITodo[] {
  return tasks;
}

/**
 * Get task by id
 *
 * @param id Task id
 * @returns Task object if found or null
 */
export function getTaskById(id: string): ITodo | null {
  const task = tasks.find(({ id: userId }) => userId === id);
  return !task ? null : task;
}

/**
 * Create a new task
 *
 * @param task Task object
 * @returns Task object
 */
export function createTask(task: ITask): ITodo {
  const newTask: ITodo = {
    id: `${tasks.length + 1}`,
    ...task,
  };
  tasks.push(newTask);

  writeJsonFile(filePath, tasks)
    .then(() => {
      console.log("JSON file has been written successfully!");
    })
    .catch((err) => {
      console.error("Error writing JSON file:", err);
    });

  return newTask;
}

/**
 * Update task
 *
 * @param id Task id
 * @param task Task object
 * @returns Task object if found or null
 */
export function updateTask(id: string, task: ITask): ITodo | null {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) return null;

  tasks[index] = { ...tasks[index], ...task };

  writeJsonFile(filePath, tasks)
    .then(() => {
      console.log("JSON file has been written successfully!");
    })
    .catch((err) => {
      console.error("Error writing JSON file:", err);
    });

  return tasks[index];
}

/**
 * Delete task
 *
 * @param id Task id
 * @returns Task object if found or null
 */
export function deleteTask(id: string): ITodo | null {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) return null;
  const data = tasks[index];

  tasks.splice(index, 1);

  writeJsonFile(filePath, tasks)
    .then(() => {
      console.log("JSON file has been written successfully!");
    })
    .catch((err) => {
      console.error("Error writing JSON file:", err);
    });

  return data;
}
