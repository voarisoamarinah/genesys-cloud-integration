import { UnauthorizedError } from "../utils/errors.js";

export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(new UnauthorizedError("Missing Authorization header"));
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return next(new UnauthorizedError("Invalid Authorization format. Expected: Bearer <token>"));
    }

    const token = parts[1];

    if (!token || token.trim().length === 0) {
        return next(new UnauthorizedError("Token missing"));
    }

    req.genesysToken = token;
    next();
}