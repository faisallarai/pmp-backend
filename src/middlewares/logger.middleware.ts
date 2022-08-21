import { NextFunction, Request, Response } from 'express';
import morgan, { StreamOptions } from 'morgan';
import logger from '../utils/logger';

export const loggerHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  logger.info('Body:  ', req.body);
  logger.info('---');
  next();
};

// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream: StreamOptions = {
  // Use the http severity
  write: (message) => logger.http(message),
};

// Skip all the Morgan http log if the
// application is not running in development mode.
// This method is not really needed here since
// we already told to the logger that it should print
// only warning and error messages in production.
const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

// Create a token here e.g type, body
morgan.token('type', function (req: Request) {
  return req.headers['content-type'];
});

morgan.token('body', (req: Request) => JSON.stringify(req.body));

// Build the morgan middleware

export const morganHandler = morgan(
  // Define message format string (this is the default one).
  // The message format is made from tokens, and each token is
  // defined inside the Morgan library.
  // You can create your custom token to show what do you want from a request.
  ':method :url :status :res[content-length] - :response-time ms :type :body',
  // Options: in this case, I overwrote the stream and the skip logic.
  // See the methods above.
  { stream, skip }
);
