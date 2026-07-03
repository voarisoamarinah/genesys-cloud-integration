import axios from "axios";
import config from "../../config/genesys.config.js";
import { getAccessToken } from "./auth.service.js";
import { ForbiddenError, NotFoundError, AppError } from "../../utils/errors.js";

const client = axios.create({
    baseURL: config.apiUrl,
    headers: {
        "Content-Type": "application/json"
    }
});

client.interceptors.request.use(
    async (request) => {
        const hasAuth = request.headers.Authorization || request.headers.authorization || (request.headers.get && request.headers.get('Authorization'));
        if (!hasAuth) {
            const token = await getAccessToken();
            request.headers.Authorization = `Bearer ${token}`;
        }

        return request;
    },
    (error) => Promise.reject(error)
);

client.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;

        if (status === 401 || status === 403) {
            return Promise.reject(new ForbiddenError("Invalid or expired Genesys token"));
        }

        if (status === 404) {
            return Promise.reject(new NotFoundError("Resource not found in Genesys"));
        }

        if (status >= 400 && status < 500) {
            return Promise.reject(new AppError(error.response?.data?.message || "Invalid request to Genesys", 400));
        }

        return Promise.reject(error);
    }
);

export default client;