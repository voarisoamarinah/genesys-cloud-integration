import axios from "axios";
import config from "../config/genesys.config.js";

export async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Missing Authorization header"
        });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({
            success: false,
            message: "Invalid Authorization format. Expected: Bearer <token>"
        });
    }

    const token = parts[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token missing"
        });
    }

    try {
        // Valider le token en appelant l'endpoint 'me' de Genesys Cloud
        await axios.get(`${config.apiUrl}/api/v2/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        req.genesysToken = token;
        next();
    } catch (error) {
        const errorMsg = error.response?.data?.message || error.message;
        console.error("Genesys token validation failed:", errorMsg);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired Genesys Cloud token",
            error: errorMsg
        });
    }
}