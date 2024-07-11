import { Router } from "express";

import {
  getUserInfo,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/userController";
import { ROLE } from "../enums/Role";
import { authenticate, authorize } from "../middleware/auth";

const router = Router();

router.get("/", authenticate, authorize(ROLE.ADMIN), getUserInfo);
router.post("/", authenticate, authorize(ROLE.ADMIN), createUser);
router.patch("/", authenticate, authorize(ROLE.ADMIN), updateUser);
router.delete("/", authenticate, authorize(ROLE.ADMIN), deleteUser);

export default router;
