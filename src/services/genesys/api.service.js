import client from "./httpClient.js";

export async function getUsers() {
    const response = await client.get("/api/v2/users");
    return response.data;
}
