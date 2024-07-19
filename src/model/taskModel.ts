import { UUID } from "crypto";

import { BaseModel } from "./Base";
import { ROLE } from "../enums/Role";
import { getUUID } from "../utils/utils";
import { NotFound } from "../error/NotFound";
import { ITask, ITodo } from "../interface/Task";
import { TASK_STATUS } from "../enums/TaskStatus";
import { UnauthorizedError } from "../error/UnauthorizedError";

const TABLE_NAME = "tasks";

export class TaskModel extends BaseModel {
  /**
   * Get all tasks
   *
   * @param userId User ID
   * @param permissions User permissions
   * @returns Array of `ITodo` objects
   */
  static async getTasks(userId: UUID, permissions: ROLE[]): Promise<ITodo[]> {
    if (permissions.includes(ROLE.ADMIN))
      return await this.connection<ITodo>(TABLE_NAME).select();

    const tasks = await this.connection<ITodo>(TABLE_NAME).where({ userId });

    return tasks;
  }

  /**
   * Get task by id
   *
   * @param id Task id
   * @returns Task object if found or null
   */
  static async getTaskById(
    taskId: UUID,
    userId: UUID,
    permissions: ROLE[],
  ): Promise<ITodo> {
    const task = await this.connection<ITodo>(TABLE_NAME)
      .where({ taskId })
      .first();

    if (!task) throw new NotFound(`Task ${taskId} does not exists`);
    if (!permissions.includes(ROLE.ADMIN) && task.userId !== userId) {
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
  static async createTask(userId: UUID, task: ITask): Promise<ITodo> {
    task.status = task.status || TASK_STATUS.NOTSTARTED;
    const newTask: ITodo = {
      taskId: getUUID(),
      userId,
      ...task,
    };
    await this.queryBuilder().insert(newTask).table(TABLE_NAME);

    return newTask;
  }

  /**
   * Update task
   *
   * @param taskId Task id
   * @param task Task object
   * @returns Task object if found or null
   */
  static async updateTask(
    taskId: UUID,
    userId: UUID,
    task: ITask,
  ): Promise<ITodo> {
    const query = await this.connection<ITodo>(TABLE_NAME)
      .where({ taskId })
      .first();

    if (!query) throw new NotFound(`Task with id ${taskId} does not exists`);

    if (query.userId !== userId)
      throw new UnauthorizedError("Can't update task");

    await this.queryBuilder().update(task).table(TABLE_NAME).where({ taskId });

    const updatedTask = await this.connection<ITodo>(TABLE_NAME)
      .where({ taskId })
      .first();

    return updatedTask!;
  }

  /**
   * Delete task
   *
   * @param id Task id
   * @returns Task object if found or null
   */
  static async deleteTask(taskId: UUID, userId: UUID): Promise<ITodo> {
    const task = await this.connection<ITodo>(TABLE_NAME)
      .where({ taskId })
      .first();

    if (!task) throw new NotFound(`Task with id ${taskId} does not exists`);

    if (task.userId !== userId)
      throw new UnauthorizedError("Can't delete task");

    await this.queryBuilder().del().table(TABLE_NAME).where({ taskId });

    return task;
  }
}
