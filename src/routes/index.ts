import express from "express";
import config from "../config";
import taskRouter from "./taskRoute";

const router = express();

router.use("/tasks", taskRouter);

export default router
