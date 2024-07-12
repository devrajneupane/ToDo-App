import * as path from "path";
import { UUID } from "crypto";

import { ROLE } from "../enums/Role";
import { NotFound } from "../error/NotFound";
import { ITask, ITodo } from "../interface/Task";
import { TASK_STATUS } from "../enums/TaskStatus";
import loggerWithNameSpace from "../utils/logger";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { getUUID, readJsonFile, writeJsonFile } from "../utils/utils";

const logger = loggerWithNameSpace(__filename);

const filePath = path.resolve(__dirname, "../../data/tasks.json");
let tasks: ITodo[] = [];

readJsonFile(filePath)
  .then((jsonData) => {
    tasks = jsonData;
  })
  .catch((err) => {
    logger.error("Error reading JSON file:", err);
  });

/**
 * Get all tasks
 *
 * @param userId User ID
 * @param permissions User permissions
 * @returns Array of `ITodo` objects
 */
export function getTasks(userId: UUID, permissions: ROLE[]): ITodo[] {
  if (permissions.includes(ROLE.ADMIN)) return tasks;

  const result = tasks.filter(({ userId: id }) => id === userId);
  return result;
}

/**
 * Get task by id
 *
 * @param id Task id
 * @returns Task object if found or null
 */
export function getTaskById(
  taskId: UUID,
  userId: UUID,
  permissions: ROLE[],
): ITodo {
  const task = tasks.find(({ taskId: id }) => id === taskId);
  if (!task || (!permissions.includes(ROLE.ADMIN) && task.userId !== userId)) {
    throw new UnauthorizedError("Can't access task");
  }

  return task;
}

/**
 * Create a new task
 *
 * @param task Task object
 * @returns Task object
 */
export function createTask(userId: UUID, task: ITask): ITodo {
  task.status = task.status || TASK_STATUS.NOTSTARTED;
  const newTask: ITodo = {
    taskId: getUUID(),
    userId,
    ...task,
  };
  tasks.push(newTask);

  writeJsonFile(filePath, tasks)
    .then(() => {
      logger.info("JSON file has been written successfully!");
    })
    .catch((error) => {
      logger.error(error.message);
    });

  return newTask;
}

/**
 * Update task
 *
 * @param taskId Task id
 * @param task Task object
 * @returns Task object if found or null
 */
export function updateTask(taskId: UUID, userId: UUID, task: ITask): ITodo {
  const index = tasks.findIndex((task) => task.taskId === taskId);

  if (index === -1 || tasks[index].userId !== userId)
    throw new UnauthorizedError("Can't update task");

  tasks[index] = { ...tasks[index], ...task };

  writeJsonFile(filePath, tasks)
    .then(() => {
      logger.info("JSON file has been written successfully!");
    })
    .catch((error) => {
      logger.error(error.message);
    });

  return tasks[index];
}

/**
 * Delete task
 *
 * @param id Task id
 * @returns Task object if found or null
 */
export function deleteTask(taskId: UUID, userId: UUID): ITodo {
  const index = tasks.findIndex((task) => task.taskId === taskId);
  const task = tasks[index];

  if (index === -1) throw new NotFound(`Task ${taskId} does not exists`);
  if (task.userId !== userId) throw new UnauthorizedError("Can't delete task");

  tasks.splice(index, 1);

  writeJsonFile(filePath, tasks)
    .then(() => {
      logger.info("JSON file has been written successfully!");
    })
    .catch((error) => {
      logger.error(error.message);
    });

  return task;
}
