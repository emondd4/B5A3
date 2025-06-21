import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Server Error';
  let errorResponse: any = err;


  // Handle Mongoose ValidationError
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = 'Validation failed';

    // Transform the error object to match the required format
    const errors: any = {};
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