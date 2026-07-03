import { AppError } from "../utils/errors.js";

export function errorMiddleware(err, req, res, next) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    console.error("Unexpected error:", err);

    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
}

// Pour les routes inexistantes
export function notFoundMiddleware(req, res) {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
}