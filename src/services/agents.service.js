import { getUsers, getUserQueues } from "./genesys/api.service.js";
import { mapAgent } from "../mappers/agent.mapper.js";

export async function getAgents() {
    const users = await getUsers();

    const agents = await Promise.all(
        users.entities.map(async (user) => {
            const queuesEntities = await getUserQueues(user.id);
            const queues = queuesEntities.map(q => q.name);

            const onQueue = user.presence?.presenceDefinition?.systemPresence === "ON_QUEUE";

            const extraData = {
                onQueue,
                queues
            };

            return mapAgent(user, extraData);
        })
    );

    return agents;
}