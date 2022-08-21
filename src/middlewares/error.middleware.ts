import { NextFunction, Request, Response } from 'express';

interface CustomError {
  name: string;
  message: string;
  status: number;
  additionalInfo: string;
}

export const errorHandler = (
  error: CustomError,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.name === 'CastError') {
    res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    res.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    res.status(401).json({
      status: false,
      message: 'Your session is not valid.',
      data: error,
    });
  } else if (error.name === 'TokenExpiredError') {
    res.status(401).json({
      status: false,
      message: 'Your session has expired.',
      data: error,
    });
  } else if (error.name === 'UnauthorizedError') {
    res.status(401).json({
      status: false,
      message: error.name + ': ' + error.message,
      data: error,
    });
  } else if (error.message === 'Insufficient scope') {
    res.status(403).json({
      status: false,
      message: error.message,
      data: error,
    });
  } else {
    next(error);
  }
};

export const unknownEndpointHandler = (_req: Request, res: Response) => {
  res.status(404).json({ status: false, message: 'Unknown endpoint' });
};
