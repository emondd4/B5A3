"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || 'Server Error';
    let errorResponse = err;
    // Handle Mongoose ValidationError
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        statusCode = 400;
        message = 'Validation failed';
        // Transform the error object to match the required format
        const errors = {};
        Object.keys(err.errors).forEach((key) => {
            const error = err.errors[key];
            errors[key] = {
                message: error.message,
                name: error.name,
                properties: {
                    message: error.message,
                    type: error.kind,
                    min: error.value,
                },
                kind: error.kind,
                path: error.path,
                value: error.value
            };
        });
        errorResponse = {
            name: 'ValidationError',
            errors,
        };
    }
    res.status(statusCode).json({
        success: false,
        message,
        error: errorResponse,
    });
};
exports.errorHandler = errorHandler;
