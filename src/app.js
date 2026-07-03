import express from "express";

import routes from "./routes/index.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Genesys Cloud Integration API"
  });
});

// Toutes les routes de l'API
app.use("/api", routes);

export default app;