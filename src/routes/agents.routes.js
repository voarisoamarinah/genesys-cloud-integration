import { Router } from "express";
import {
  getAgentsController,
  getAvailableAgentsController,
  getAgentAvailabilityController
} from "../controllers/agents.controller.js";

const router = Router();

// GET /api/agents
router.get("/", getAgentsController);

// GET /api/agents/available
router.get("/available", getAvailableAgentsController);

// GET /api/agents/:id/availability
router.get("/:id/availability", getAgentAvailabilityController);

export default router;