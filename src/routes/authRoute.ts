import { Router } from "express";

import { createAuthSchema } from "../schema/auth";
import { validateReqBody } from "../middleware/validator";
import { login, refresh } from "../controller/authController";
import { requestHandler } from "../utils/requestWrapper";

const router = Router();

router.post(
  "/login",
  requestHandler([validateReqBody(createAuthSchema), login]),
);
router.get("/refresh", refresh);

export default router;
