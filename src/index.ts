import http from 'http';
import app from './app';
import logger from './utils/logger';

const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

server.listen('4000', () => {
  logger.debug(`Server is up and running @ http://localhost:${PORT}`);
});
