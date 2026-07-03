import axios from "axios";
import config from "../../config/genesys.config.js";
import { getAccessToken } from "./auth.service.js";

const client = axios.create({
    baseURL: config.apiUrl,
    headers: {
        "Content-Type": "application/json"
    }
});

client.interceptors.request.use(
    async (request) => {
        const token = await getAccessToken();

        request.headers.Authorization = `Bearer ${token}`;

        return request;
    },
    (error) => Promise.reject(error)
);

export default client;