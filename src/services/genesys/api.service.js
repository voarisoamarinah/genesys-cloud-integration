import client from "./httpClient.js";

export async function getUsers() {
    const response = await client.get("/api/v2/users", {
        params: {
            expand: "presence,routingStatus,division,groups"
        }
    });

    return response.data;
}

export async function getUserQueues(userId) {
    const response = await client.get(`/api/v2/users/${userId}/queues`);
    return response.data.entities || [];
}