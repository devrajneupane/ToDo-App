import { Router } from "express";

import {
  createTaskBodySchema,
  taskIdParamSchema,
  updateTaskBodySchema,
} from "../schema/task";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../controller/taskController";
import { ROLE } from "../enums/Role";
import { requestHandler } from "../utils/requestWrapper";
import { authenticate, authorize } from "../middleware/auth";
import { validateReqBody, validateReqParams } from "../middleware/validator";

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
