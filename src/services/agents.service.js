import { getUsers, getUserQueues, getUserById } from "./genesys/api.service.js";
import { mapAgent } from "../mappers/agent.mapper.js";

export async function getAgents(token, queueFilter) {
    const users = await getUsers(token);

    const agents = await Promise.all(
        users.entities.map(async (user) => {
            const queuesEntities = await getUserQueues(user.id, token);
            const queues = queuesEntities.map(q => q.name);

            const onQueue = user.routingStatus?.status !== "OFF_QUEUE";

            const extraData = {
                onQueue,
                queues
            };

            return mapAgent(user, extraData);
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
    const user = await getUserById(agentId, token);
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