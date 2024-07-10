import { Router } from "express";

import {
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  createTask,
} from "../controller/taskController";
import { auth } from "../middleware/auth";

const router = Router();

// Define the routes
router.get("/", auth, getTasks);
router.get("/:id", auth, getTaskById);
router.post("/", auth, createTask);
router.patch("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

export default router;
