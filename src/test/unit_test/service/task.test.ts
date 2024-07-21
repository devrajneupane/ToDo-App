import expect from "expect";
import sinon from "sinon";

import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../../../service/taskService";

import { NotFound } from "../../../error/NotFound";
import { TaskModel } from "../../../model/taskModel";
import { ITask, ITodo } from "../../../interface/Task";
import { TASK_STATUS } from "../../../enums/TaskStatus";

describe("Task Service Test Suite", () => {
  describe("getTasks", () => {
    let taskModelGetAllTasksStub: sinon.SinonStub;

    beforeEach(() => {
      taskModelGetAllTasksStub = sinon.stub(TaskModel, "getTasks");
    });

    afterEach(() => {
      taskModelGetAllTasksStub.restore();
    });

    it("Should return all tasks for a user", async () => {
      const tasks: ITodo[] = [
        {
          taskId: "08b8bc54-0439-45f2-ad60-ae3a17d3b0b7",
          userId: "06f44fc3-3b48-4e2e-abfe-b5abab5d933f",
          title: "task1",
          desc: "Task 1",
          status: TASK_STATUS.PENDING,
        },
      ];
      taskModelGetAllTasksStub.resolves([...tasks]);
      const res = await getTasks(tasks[0].userId);
      expect(res.data).toStrictEqual([...tasks]);
    });
  });

  describe("getTaskById", () => {
    let taskModelGetTaskByIdStub: sinon.SinonStub;

    beforeEach(() => {
      taskModelGetTaskByIdStub = sinon.stub(TaskModel, "getTaskById");
    });

    afterEach(() => {
      taskModelGetTaskByIdStub.restore();
    });

    it("Should throw error when task is not found", async () => {
      taskModelGetTaskByIdStub.resolves(undefined);
      const taskId = "08b8bc54-0439-45f2-ad60-ae3a17d3b0b7";

      expect(
        async () =>
          await getTaskById(taskId, "06f44fc3-3b48-4e2e-abfe-b5abab5d933f"),
      ).rejects.toThrow(new NotFound(`Task ${taskId} does not exists`));
    });

    it("Should return the task when task is found", async () => {
      const task: ITodo = {
        taskId: "08b8bc54-0439-45f2-ad60-ae3a17d3b0b7",
        userId: "06f44fc3-3b48-4e2e-abfe-b5abab5d933f",
        title: "prepare food",
        desc: "prepare food for dinner",
        status: TASK_STATUS.PENDING,
      };
      taskModelGetTaskByIdStub.resolves(task);
      const res = await getTaskById(
        "08b8bc54-0439-45f2-ad60-ae3a17d3b0b7",
        "06f44fc3-3b48-4e2e-abfe-b5abab5d933f",
      );
      expect(res.data).toStrictEqual(task);
    });
  });

  describe("createTask", () => {
    let taskModelCreateTaskStub: sinon.SinonStub;

    beforeEach(() => {
      taskModelCreateTaskStub = sinon.stub(TaskModel, "createTask");
    });

    afterEach(() => {
      taskModelCreateTaskStub.restore();
    });

    it("Should create and return a new task", async () => {
      const task: ITodo = {
        taskId: "08b8bc54-0439-45f2-ad60-ae3a17d3b0b7",
        userId: "06f44fc3-3b48-4e2e-abfe-b5abab5d933f",
        title: "task 2",
        desc: "task 2 description",
        status: TASK_STATUS.PENDING,
      };
      taskModelCreateTaskStub.resolves(task);
      const res = await createTask("06f44fc3-3b48-4e2e-abfe-b5abab5d933f", {
        title: "task 2",
        desc: "task 2 description",
        status: TASK_STATUS.PENDING,
      } as ITask);

      expect(res).toStrictEqual({
        message: "Task created successfully",
        data: task,
      });
    });

    it("Should throw an error if task creation fails", async () => {
      taskModelCreateTaskStub.resolves(null);

      expect(
        async () =>
          await createTask("06f44fc3-3b48-4e2e-abfe-b5abab5d933f", {
            title: "task 2",
            desc: "task 2 description",
            status: TASK_STATUS.PENDING,
          }),
      ).rejects.toThrow(new Error("Failed to create Task"));
    });
  });

  describe("updateTask", () => {
    let taskModelUpdateTaskStub: sinon.SinonStub;

    beforeEach(() => {
      taskModelUpdateTaskStub = sinon.stub(TaskModel, "updateTask");
    });

    afterEach(() => {
      taskModelUpdateTaskStub.restore();
    });

    it("Should update task detail and return updated task", async () => {
      const task: ITodo = {
        taskId: "06f44fc3-3b48-4e2e-abfe-b5abab5d933f",
        userId: "06f44fc3-3b48-4e2e-abfe-b5abab5d933f",
        title: "Task 1",
        desc: "Updated Task 1",
        status: TASK_STATUS.PENDING,
      };
      taskModelUpdateTaskStub.resolves(task);
      const res = await updateTask(
        "08b8bc54-0439-45f2-ad60-ae3a17d3b0b7",
        "06f44fc3-3b48-4e2e-abfe-b5abab5d933f",
        {
          title: "Task 1",
          desc: "Updated Task 1",
          status: TASK_STATUS.DONE,
        },
      );
      expect(res).toStrictEqual({
        message: "Task updated successfully",
        data: task,
      });
    });

    it("Should throw an error when task is not found", async () => {
      taskModelUpdateTaskStub.resolves(null);

      const taskId = "08b8bc54-0439-45f2-ad60-ae3a17d3b0b7";

      expect(
        async () =>
          await updateTask(taskId, "06f44fc3-3b48-4e2e-abfe-b5abab5d933f", {
            title: "Task 1",
            desc: "Updated Task 1",
            status: TASK_STATUS.DONE,
          }),
      ).rejects.toThrow(new NotFound(`Task with id ${taskId} does not exists`));
    });
  });

  describe("deleteTask", () => {
    let taskModelDeleteTaskStub: sinon.SinonStub;

    beforeEach(() => {
      taskModelDeleteTaskStub = sinon.stub(TaskModel, "deleteTask");
    });

    afterEach(() => {
      taskModelDeleteTaskStub.restore();
    });

    it("Should delete task when task is found", async () => {
      const task: ITodo = {
        taskId: "08b8bc54-0439-45f2-ad60-ae3a17d3b0b7",
        userId: "06f44fc3-3b48-4e2e-abfe-b5abab5d933f",
        title: "Task 1",
        desc: "Updated Task 1",
        status: TASK_STATUS.PENDING,
      };
      taskModelDeleteTaskStub.resolves(task);

      const res = await deleteTask(
        "08b8bc54-0439-45f2-ad60-ae3a17d3b0b7",
        "06f44fc3-3b48-4e2e-abfe-b5abab5d933f",
      );

      expect(res.data).toStrictEqual(task);
    });

    it("Should throw an error when task is not found", async () => {
      taskModelDeleteTaskStub.resolves(null);

      const taskId = "08b8bc54-0439-45f2-ad60-ae3a17d3b0b7";

      expect(() =>
        deleteTask(taskId, "06f44fc3-3b48-4e2e-abfe-b5abab5d933f"),
      ).rejects.toThrow(new NotFound(`Task with id ${taskId} does not exists`));
    });
  });
});
