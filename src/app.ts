import express from "express";
import config from "./config";
import router from "./routes/";

// Initialize express
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the router
app.use(router);

app.get("/", (req, res) => {
  res.json({
    message: "Todo App",
  });
});

app.listen(config.port, () => {
  console.log(`Server started listening on port: ${config.port}`);
});
