import dotenv from "dotenv";
import { CorsOptions } from "cors";
import { Options } from "express-rate-limit";

import { ALLOWED_ORIGINS } from "./constant/constants";

dotenv.config();

export const env = {
  port: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiryMS: 30000,
    refreshTokenExpiryMS: 300000,
  },
};

export const rateLimiterOptions: Partial<Options> = {
  windowMs: 60 * 1000,
  max: 100,
  message: "Too many Request",
};

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed"));
    }
  },
};
