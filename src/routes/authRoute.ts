import { Router } from "express";

import { login, refresh } from "../controller/authController";

const router = Router();

router.post("/login", login);
router.get("/refresh", refresh);

export default router;

