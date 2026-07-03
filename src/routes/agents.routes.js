import { Router } from "express";
import {
  getAgentsController
} from "../controllers/agents.controller.js";

const router = Router();

// GET /api/agents
router.get("/", getAgentsController);

export default router;