import { getAgents, getAvailableAgents, getAgentAvailability } from "../services/agents.service.js";

export async function getAgentsController(req, res, next) {
  try {
    const token = req.genesysToken;
    const { queue } = req.query;
    const agents = await getAgents(token, queue);

    res.status(200).json({ success: true, data: agents });
  } catch (error) {
    next(error);
  }
}

export async function getAvailableAgentsController(req, res, next) {
  try {
    const token = req.genesysToken;
    const { queue } = req.query;
    const agents = await getAvailableAgents(token, queue);

    res.status(200).json({ success: true, data: agents });
  } catch (error) {
    next(error);
  }
}

export async function getAgentAvailabilityController(req, res, next) {
  try {
    const token = req.genesysToken;
    const { id } = req.params;
    const availability = await getAgentAvailability(token, id);

    res.status(200).json({ success: true, data: availability });
  } catch (error) {
    next(error);
  }
}