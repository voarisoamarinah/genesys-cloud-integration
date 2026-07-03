import express from "express";

import routes from "./routes/index.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Genesys Cloud Integration API"
  });
});

app.use("/api", authMiddleware);

app.use("/api", routes);

export default app;