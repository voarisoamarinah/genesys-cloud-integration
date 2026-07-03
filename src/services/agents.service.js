import { getUsers } from "./genesys/api.service.js";
import { mapAgent } from "../mappers/agent.mapper.js";

export async function getAgents() {
    const users = await getUsers();

    const agents = await Promise.all(
        users.entities.map(async (user) => {
            const extraData = {
                presence: "Available",
                routingStatus: "IDLE",
                onQueue: true,
                queues: ["Support"]
            };

            return mapAgent(user, extraData);
        })
    );

    return agents;
}