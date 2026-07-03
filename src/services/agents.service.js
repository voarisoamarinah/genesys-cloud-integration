import { getUsers, getUserById, getUserQueues } from "./genesys/api.service.js";
import { mapAgent } from "../mappers/agent.mapper.js";
import { BadRequestError, NotFoundError } from "../utils/errors.js";

export async function getAgents(token, queueFilter) {
    if (queueFilter !== undefined && typeof queueFilter !== "string") {
        throw new BadRequestError("Invalid 'queue' filter");
    }

    const users = await getUsers(token);

    const agents = await Promise.all(
        users.entities.map(async (user) => {
            const queuesEntities = await getUserQueues(user.id, token);
            const queues = queuesEntities.map(q => q.name);
            const onQueue = user.routingStatus?.status !== "OFF_QUEUE";

            return mapAgent(user, { onQueue, queues });
        })
    );

    if (queueFilter) {
        return agents.filter(agent =>
            agent.queues.some(q => q.toLowerCase() === queueFilter.toLowerCase())
        );
    }

    return agents;
}

export async function getAvailableAgents(token, queueFilter) {
    const agents = await getAgents(token, queueFilter);
    return agents.filter(agent => agent.canReceiveInteraction === true);
}

export async function getAgentAvailability(token, agentId) {
    if (!agentId || typeof agentId !== "string" || agentId.trim().length === 0) {
        throw new BadRequestError("Invalid agent id");
    }

    let user;
    try {
        user = await getUserById(agentId, token);
    } catch (error) {
        if (error.statusCode === 404) {
            throw new NotFoundError(`Agent ${agentId} not found`);
        }
        throw error;
    }

    const queuesEntities = await getUserQueues(agentId, token);
    const queues = queuesEntities.map(q => q.name);
    const onQueue = user.routingStatus?.status !== "OFF_QUEUE";

    const agent = mapAgent(user, { onQueue, queues });

    return {
        agentId: agent.agentId,
        fullName: agent.fullName,
        presence: agent.presence,
        routingStatus: agent.routingStatus,
        onQueue: agent.onQueue,
        queues: agent.queues,
        canReceiveInteraction: agent.canReceiveInteraction
    };
}