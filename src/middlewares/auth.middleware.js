export function authMiddleware(req, res, next) {
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

    if (!token || token.trim().length === 0) {
        return res.status(401).json({
            success: false,
            message: "Token missing"
        });
    }

    req.genesysToken = token;
    next();
}