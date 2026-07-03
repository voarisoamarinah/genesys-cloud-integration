import express from "express";

import routes from "./routes/index.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";
import { errorMiddleware, notFoundMiddleware } from "./middlewares/error.middleware.js";

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

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;