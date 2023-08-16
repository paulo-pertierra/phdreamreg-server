import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import rateLimiter from './middlewares/ratelimit.handler';

import { webRouter } from './modules/web/web.route';
import { apiRouter } from './routes';
import { healthzRouter } from './modules/healthz/healthz.route';
import { errorHandler } from './middlewares/error.handler';

dotenv.config();

const app = express();

app.use(cors());
app.use(compression({ threshold: 0 }));
app.use(morgan('common'));
app.use(express.json());
app.use(express.static(__dirname + '/../public'));
app.use('/', webRouter);
app.use('/api', rateLimiter, apiRouter);
app.use('/healthz', healthzRouter);
app.use(errorHandler);

const ENVIRONMENT = process.env.ENVIRONMENT || 'development';
const BASE_URL = process.env.BASE_URL || 'http://localhost';
const PORT = process.env.PORT || 5000;
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'SECRET';

function start() {
  if (
    typeof PORT === 'undefined' ||
    typeof BASE_URL === 'undefined' ||
    typeof ADMIN_SECRET === 'undefined'
  ) {
    throw new Error(`Cannot start app server, .env variables are incomplete.`);
  }
  app.listen(PORT, () => {
    if (ENVIRONMENT === 'development') {
      //eslint-disable-next-line
      console.log(`Development server is running at http://localhost:${PORT}`);
    }
    if (ENVIRONMENT === 'production') {
      //eslint-disable-next-line
      console.log(`Server is deployed at ${BASE_URL}`);
    }
  });
}

start();
