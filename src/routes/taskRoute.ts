import { Router } from "express";

import {
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  createTask,
} from "../controller/taskController";

const router = Router();

// Define the routes
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
