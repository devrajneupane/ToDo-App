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
import { requestHandler } from "../utils/requestWrapper";

const router = Router();

// Define the routes
router.get(
  "/",
  requestHandler([authenticate, authorize([ROLE.USER, ROLE.ADMIN]), getTasks]),
);

// Get task by id
router.get(
  "/:id",
  requestHandler([
    authenticate,
    authorize([ROLE.USER, ROLE.ADMIN]),
    validateReqParams(taskIdParamSchema),
    getTaskById,
  ]),
);
router.post(
  "/",
  requestHandler([
    authenticate,
    authorize([ROLE.USER, ROLE.ADMIN]),
    validateReqBody(createTaskBodySchema),
    createTask,
  ]),
);
router.patch(
  "/:id",
  requestHandler([
    authenticate,
    authorize(ROLE.USER),
    validateReqParams(taskIdParamSchema),
    validateReqBody(updateTaskBodySchema),
    updateTask,
  ]),
);
router.delete(
  "/:id",
  requestHandler([
    authenticate,
    authorize(ROLE.USER),
    validateReqParams(taskIdParamSchema),
    deleteTask,
  ]),
);

export default router;
