import cors from "cors";
import helmet from "helmet";
import express from "express";
import rateLimiter from "express-rate-limit";
import HttpStatusCodes from "http-status-codes";

import config from "./config";
import router from "./routes/";
import { requestLogger } from "./middleware/logger";
import { ALLOWED_ORIGINS } from "./constant/constants";
import { genericErrorHandler, notFoundError } from "./middleware/errorHandler";

// Initialize express
const app = express();

const limiter = rateLimiter({
  windowMs: 60 * 1000,
  limit: 10,
  message: "Too many Request",
});

app.use(helmet());

app.use(limiter);

app.use(
  cors({
    origin: (origin, callback) => {
      console.log(origin);
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed"));
      }
    },
  }),
);

// Middleware to parse JSON bodies
app.use(express.json());

app.use(requestLogger);

app.use(router);

app.use(notFoundError);

app.use(genericErrorHandler);

app.get("/", (req, res) => {
  res.status(HttpStatusCodes.OK).send({
    message: "App is running",
  });
});

app.listen(config.port, () => {
  console.log(`Server started listening on port: ${config.port}`);
});
