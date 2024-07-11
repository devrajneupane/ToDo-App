import { Router } from "express";

import {
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  createTask,
} from "../controller/taskController";
import { ROLE } from "../enums/Role";
import { authenticate, authorize } from "../middleware/auth";

const router = Router();

// Define the routes
router.get("/", authenticate, authorize([ROLE.USER, ROLE.ADMIN]), getTasks);
router.get("/:id", authenticate, authorize([ ROLE.USER, ROLE.ADMIN ]), getTaskById);
router.post("/", authenticate, authorize(([ ROLE.USER, ROLE.ADMIN ])), createTask);
router.patch("/:id", authenticate, authorize(ROLE.USER), updateTask);
router.delete("/:id", authenticate, authorize(ROLE.USER), deleteTask);

export default router;
