import { Router } from "express";
import {
  getAgentsController,
  getAvailableAgentsController
} from "../controllers/agents.controller.js";

const router = Router();

// GET /api/agents
router.get("/", getAgentsController);

// GET /api/agents/available
router.get("/available", getAvailableAgentsController);

export default router;