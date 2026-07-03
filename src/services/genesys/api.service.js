import client from "./httpClient.js";

export async function getUsers(token) {
    let allUsers = [];
    let pageNumber = 1;
    let pageCount = 1;

    do {
        const response = await client.get("/api/v2/users", {
            params: {
                expand: "presence,routingStatus,division,groups,integrationPresence",
                pageSize: 100,
                pageNumber: pageNumber
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = response.data;
        if (data.entities && data.entities.length > 0) {
            allUsers.push(...data.entities);
        }

        pageCount = data.pageCount || 1;
        pageNumber++;
    } while (pageNumber <= pageCount);

    return { entities: allUsers };
}

export async function getUserById(userId, token) {
    const response = await client.get(`/api/v2/users/${userId}`, {
        params: {
            expand: "presence,routingStatus,division,groups,integrationPresence"
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
