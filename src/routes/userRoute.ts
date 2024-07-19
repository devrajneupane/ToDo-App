import { Router } from "express";

import {
  getUserInfo,
  createUser,
  updateUser,
  deleteUser,
  getUsers,
} from "../controller/userController";
import {
  createUserBodySchema,
  updateUserBodySchema,
  userReqParamSchema,
  userReqQuerySchema,
} from "../schema/user";
import { ROLE } from "../enums/Role";
import { validateReqBody, validateReqParams, validateReqQuery } from "../middleware/validator";
import { authenticate, authorize } from "../middleware/auth";
import { requestHandler } from "../utils/requestWrapper";

const router = Router();

router.get(
  "/",
  requestHandler([
    authenticate,
    authorize(ROLE.ADMIN),
    validateReqQuery(userReqQuerySchema),
    getUsers,
  ]),
);

router.get(
  "/:id",
  requestHandler([
    authenticate,
    authorize(ROLE.ADMIN),
    validateReqParams(userReqParamSchema),
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
    validateReqQuery(userReqParamSchema),
    validateReqBody(updateUserBodySchema),
    updateUser,
  ]),
);

router.delete(
  "/",
  requestHandler([
    authenticate,
    authorize(ROLE.ADMIN),
    validateReqQuery(userReqParamSchema),
    deleteUser,
  ]),
);

export default router;
