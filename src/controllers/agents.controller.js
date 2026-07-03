import { getAgents } from "../services/agents.service.js";

export async function getAgentsController(req, res) {
  try {
    const agents = await getAgents();

    res.status(200).json({
      success: true,
      data: agents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}