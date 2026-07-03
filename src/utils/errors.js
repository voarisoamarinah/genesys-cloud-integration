export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequestError extends AppError {
    constructor(message = "Invalid input") {
        super(message, 400);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = "Missing or empty token") {
        super(message, 401);
    }
}

export class ForbiddenError extends AppError {
    constructor(message = "Invalid or expired token") {
        super(message, 403);
    }
}

export class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(message, 404);
    }
}