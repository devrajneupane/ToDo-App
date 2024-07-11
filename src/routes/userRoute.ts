import { Router } from "express";

import {
  getUserInfo,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/userController";
import { ROLE } from "../enums/Role";
import { validateReqBody, validateReqQuery } from "../middleware/validator";
import { authenticate, authorize } from "../middleware/auth";
import { createUserBodySchema, updateUserBodySchema, userIdQuerySchema } from "../schema/user";

const router = Router();

router.get(
  "/",
  authenticate,
  authorize(ROLE.ADMIN),
  validateReqQuery(userIdQuerySchema),
  getUserInfo,
);
router.post(
  "/",
  authenticate,
  authorize(ROLE.ADMIN),
  validateReqBody(createUserBodySchema),
  createUser
);
router.patch(
  "/",
  authenticate,
  authorize(ROLE.ADMIN),
  validateReqBody(updateUserBodySchema),
  updateUser
);
router.delete(
  "/",
  authenticate,
  authorize(ROLE.ADMIN),
  validateReqQuery(userIdQuerySchema),
  deleteUser
);

export default router;
