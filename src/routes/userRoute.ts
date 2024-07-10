import { Router } from "express";

import {
  getUserInfo,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/userController";
import { auth } from "../middleware/auth";

const router = Router();

router.get("/", auth, getUserInfo);
router.post("/", createUser);
router.patch("/", auth, updateUser);
router.delete("/", auth, deleteUser);

export default router;
