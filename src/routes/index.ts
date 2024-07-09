import express from "express";
import config from "../config";
import taskRouter from "./taskRoute";

const router = express();

// Use the taskRouter
router.use("/tasks", taskRouter);

export default router
