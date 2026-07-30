import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
    let error = err;

    if (!(error instanceof ApiError)) {
        let statusCode = error.statusCode || 500;
        let message = error.message || "Internal Server Error";

        // Mongoose validation / duplicate key / cast errors
        if (error.name === "CastError") {
            statusCode = 400;
            message = `Invalid format for field: ${error.path}`;
        } else if (error.name === "ValidationError") {
            statusCode = 400;
            message = Object.values(error.errors || {}).map((val) => val.message).join(", ") || message;
        } else if (error.code === 11000) {
            statusCode = 409;
            message = `Duplicate field value entered: ${Object.keys(error.keyValue || {}).join(", ")}`;
        } else if (error.name === "JsonWebTokenError") {
            statusCode = 401;
            message = "Invalid token. Please log in again.";
        } else if (error.name === "TokenExpiredError") {
            statusCode = 401;
            message = "Token expired. Please log in again.";
        }

        error = new ApiError(statusCode, message, error?.errors || [], error.stack);
    }

    const response = {
        statusCode: error.statusCode,
        message: error.message,
        success: error.success,
        errors: error.errors,
        data: error.data,
        ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {})
    };

    return res.status(error.statusCode).json(response);
};

export { errorHandler };
