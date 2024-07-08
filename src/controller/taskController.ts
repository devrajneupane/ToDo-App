import { Request, Response } from "express";
import * as TaskService from "../service/taskService";

export function getTasks(req: Request, res: Response) {
  const data = TaskService.getTasks();
  res.json(data);
}

export function getTaskById(req: Request, res: Response) {
  const { id } = req.params;
  const data = TaskService.getTaskById(id);

  res.json(data);
}

export function createTask(req: Request, res: Response) {
  const { body } = req;
  TaskService.createTask(body);

  res.json({
    message: "Task created",
    ...body,
  });
}

export function updateTask(req: Request, res: Response) {
  const { id } = req.params;
  const { body } = req;
  const data = TaskService.updateTask(id, body);

  if (data) {
    res.json(data);
  } else {
    res.json({
      message: "Task updated",
      ...body,
    });
  }
}

export function deleteTask(req: Request, res: Response) {
  const { id } = req.params;
  const data = TaskService.deleteTask(id);

  if (data) {
    res.json(data);
  } else {
    res.json({
      message: "Task deleted",
    });
  }
}
