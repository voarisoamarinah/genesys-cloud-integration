import { getAgents } from "../services/agents.service.js";

export async function getAgentsController(req, res) {
  try {
    const token = req.genesysToken;
    const { queue } = req.query;
    const agents = await getAgents(token, queue);

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