import { getAgents, getAvailableAgents, getAgentAvailability } from "../services/agents.service.js";

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

export async function getAvailableAgentsController(req, res) {
  try {
    const token = req.genesysToken;
    const { queue } = req.query;
    const agents = await getAvailableAgents(token, queue);

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

export async function getAgentAvailabilityController(req, res) {
  try {
    const token = req.genesysToken;
    const { id } = req.params;

    const availability = await getAgentAvailability(token, id);

    res.status(200).json({
      success: true,
      data: availability
    });
  } catch (error) {
    const status = error.response?.status === 404 ? 404 : 500;
    const message = status === 404
      ? "Agent not found"
      : error.message;

    res.status(status).json({
      success: false,
      message
    });
  }
}