import { Router } from "express";

import agentsRoutes from "./agents.routes.js";

const router = Router();

router.use("/agents", agentsRoutes);

export default router;