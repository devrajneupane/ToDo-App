import express from "express";
import HttpStatusCodes from "http-status-codes"

import config from "./config";
import router from "./routes/";
import { genericErrorHandler, notFoundError } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/logger";

// Initialize express
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use(requestLogger)

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
