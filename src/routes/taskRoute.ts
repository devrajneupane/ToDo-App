import { Router } from "express";

import {
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  createTask,
} from "../controller/taskController";
import {
  createTaskBodySchema,
  taskIdParamSchema,
  updateTaskBodySchema,
} from "../schema/task";
import { ROLE } from "../enums/Role";
import { updateUserBodySchema } from "../schema/user";
import { authenticate, authorize } from "../middleware/auth";
import { validateReqBody, validateReqParams } from "../middleware/validator";

const router = Router();

// Define the routes
router.get("/", authenticate, authorize([ROLE.USER, ROLE.ADMIN]), getTasks);
router.get(
  "/:id",
  authenticate,
  authorize([ROLE.USER, ROLE.ADMIN]),
  validateReqParams(taskIdParamSchema),
  getTaskById,
);
router.post(
  "/",
  authenticate,
  authorize([ROLE.USER, ROLE.ADMIN]),
  validateReqBody(createTaskBodySchema),
  createTask,
);
router.patch(
  "/:id",
  authenticate,
  authorize(ROLE.USER),
  validateReqParams(taskIdParamSchema),
  validateReqBody(updateTaskBodySchema),
  updateTask,
);
router.delete(
  "/:id",
  authenticate,
  authorize(ROLE.USER),
  validateReqParams(taskIdParamSchema),
  deleteTask,
);

export default router;
