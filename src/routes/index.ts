import express from "express";
import config from "../config";

import taskRouter from "./taskRoute";
import userRouter from "./userRoute";
import authRouter from "./authRoute";

const router = express();

// Use Routes
router.use("/auth", authRouter);
router.use("/tasks", taskRouter);
router.use("/users", userRouter);

export default router
