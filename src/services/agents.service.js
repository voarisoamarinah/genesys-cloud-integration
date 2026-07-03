import { getUsers, getUserQueues } from "./genesys/api.service.js";
import { mapAgent } from "../mappers/agent.mapper.js";

export async function getAgents(token) {
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

    return agents;
}