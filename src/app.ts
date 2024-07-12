import cors from "cors";
import helmet from "helmet";
import express from "express";
import rateLimiter from "express-rate-limit";
import HttpStatusCodes from "http-status-codes";

import router from "./routes/";
import loggerWithNameSpace from "./utils/logger";
import { env, rateLimiterOptions } from "./config";
import { requestLogger } from "./middleware/logger";
import { ALLOWED_ORIGINS } from "./constant/constants";
import { corsOptions, env, rateLimiterOptions } from "./config";
import { genericErrorHandler, notFoundError } from "./middleware/errorHandler";

const logger = loggerWithNameSpace(__filename);

// Initialize express
const app = express();

const limiter = rateLimiter(rateLimiterOptions);

app.use(helmet());

app.use(limiter);

// Middleware to enable CORS
app.use(cors(corsOptions))

// Middleware to parse JSON bodies
app.use(express.json());

app.use(requestLogger);

app.use(router);

app.use(notFoundError);

app.use(genericErrorHandler);

app.listen(env.port, () => {
  logger.info(`Server started listening on port: ${env.port}`)
});
