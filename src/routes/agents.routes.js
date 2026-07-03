import { Router } from "express";
import {
  getAgents,
  getAgentById
} from "../controllers/agents.controller.js";

const router = Router();

// GET /api/agents
router.get("/", getAgents);

// GET /api/agents/:id
router.get("/:id", getAgentById);

export default router;