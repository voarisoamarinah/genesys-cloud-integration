import client from "./httpClient.js";

export async function getUsers(token) {
    const response = await client.get("/api/v2/users", {
        params: {
            expand: "presence,routingStatus,division,groups"
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}

export async function getUserQueues(userId, token) {
    const response = await client.get(`/api/v2/users/${userId}/queues`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.entities || [];
}