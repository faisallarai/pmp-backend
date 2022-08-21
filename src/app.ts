import express, { Request } from 'express';

import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import constituencyRouter from './controllers/constituencyRouter';
import countryRouter from './controllers/countryRouter';
import pollingStationRouter from './controllers/pollingStationRouter';
import regionRouter from './controllers/regionRouter';
import voterRouter from './controllers/voterRouter';
import { checkJwt } from './middlewares/authz.middleware';
import {
  errorHandler,
  unknownEndpointHandler,
} from './middlewares/error.middleware';
import { loggerHandler, morganHandler } from './middlewares/logger.middleware';

morgan.token('body', (req: Request) => JSON.stringify(req.body));

const app = express();

// compresses all the responses
const allowedThreshold = 6;
const compressionOptions: compression.CompressionOptions = {
  threshold: allowedThreshold,
  filter: function () {
    return true;
  },
};
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(compression(compressionOptions));

// adding set of security middlewares
app.use(helmet());
app.disable('x-powered-by');

// enable all CORS request
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));

// parse incoming request body and append data to `req.body`
app.use(express.json({ limit: '700mb' }));

// add logger middleware
app.use(morganHandler);
app.use(loggerHandler);

// add authentication to the endpoints
app.use(checkJwt);

app.use('/api/v1/voters/', voterRouter);
app.use('/api/v1/countries/', countryRouter);
app.use('/api/v1/regions/', regionRouter);
app.use('/api/v1/constituencies/', constituencyRouter);
app.use('/api/v1/pollingStations/', pollingStationRouter);

// add unknown endpoint handler middleware
app.use(unknownEndpointHandler);

// add custom error handler middleware as the last middleware
app.use(errorHandler);
export default app;
