import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';

import apiRouter from './modules/api.routes';

import webRouter from './modules/web/web.route';
import healthzRouter from './modules/healthz/healthz.route';

import rateLimiter from './middlewares/ratelimit.handler';
import errorHandler from './middlewares/error.handler';
import notFoundHandler from './middlewares/notfound.handler';

dotenv.config();

const app = express();

app.disable('x-powered-by');
app.use(cors());

app.use(compression({ threshold: 0 }));
app.use(express.json());

app.use(morgan('common', { skip: (req, _res) => req.url === '/healthz' }));

app.use(express.static(__dirname + '/../public'));
app.use('/', webRouter);
app.use('/api', rateLimiter, apiRouter);
app.use('/healthz', healthzRouter);
app.use(errorHandler);
app.use('*', notFoundHandler);

const ENVIRONMENT = process.env.ENVIRONMENT || 'development';
const BASE_URL = process.env.BASE_URL || 'http://localhost';
const PORT = process.env.PORT || 5000;

function start() {
  const server = app.listen(PORT, () => {
    if (ENVIRONMENT === 'development') {
      // eslint-disable-next-line
      console.log(`Development server is running at http://localhost:${PORT}`);
    }
    if (ENVIRONMENT === 'production') {
      // eslint-disable-next-line
      console.log(`Server is deployed at ${BASE_URL}`);
    }
  });
  process.on("SIGTERM", () => {
    // eslint-disable-next-line
    console.log('SIGTERM signal received: If using Render, server may have spun down.');
    // eslint-disable-next-line
    server.close(() => console.log("Gracefully shut down."))
  })
}

start();
