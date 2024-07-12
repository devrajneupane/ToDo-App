import { Router } from "express";

import {
  getUserInfo,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/userController";
import {
  createUserBodySchema,
  updateUserBodySchema,
  userIdQuerySchema,
} from "../schema/user";
import { ROLE } from "../enums/Role";
import { validateReqBody, validateReqQuery } from "../middleware/validator";
import { authenticate, authorize } from "../middleware/auth";
import { requestHandler } from "../utils/requestWrapper";

const router = Router();

router.get(
  "/",
  requestHandler([
    authenticate,
    authorize(ROLE.ADMIN),
    validateReqQuery(userIdQuerySchema),
    getUserInfo,
  ]),
);

router.post(
  "/",
  requestHandler([
    authenticate,
    authorize(ROLE.ADMIN),
    validateReqBody(createUserBodySchema),
    createUser,
  ]),
);

router.patch(
  "/",
  requestHandler([
    authenticate,
    authorize(ROLE.ADMIN),
    validateReqQuery(userIdQuerySchema),
    validateReqBody(updateUserBodySchema),
    updateUser,
  ]),
);

router.delete(
  "/",
  requestHandler([
    authenticate,
    authorize(ROLE.ADMIN),
    validateReqQuery(userIdQuerySchema),
    deleteUser,
  ]),
);

export default router;
