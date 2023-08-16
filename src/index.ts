import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';

import { apiRouter } from './routes';
import { healthzRouter } from './modules/healthz/healthz.route';
import { webRouter } from './modules/web/web.route';
import { errorHandler } from './middlewares/error.handler';

dotenv.config();

const app = express();

app.use(cors());
app.use(compression({ threshold: 0 }));
app.use(morgan('common'));
app.use(express.json());
app.use(express.static(__dirname + '/../public'));
app.use('/', webRouter);
app.use('/api', apiRouter);
app.use('/healthz', healthzRouter);

app.use(errorHandler);

const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;
const ENVIRONMENT = process.env.ENVIRONMENT || 'development';

function start() {
  if (typeof PORT === 'undefined' || typeof BASE_URL === 'undefined') {
    throw new Error(`Cannot start app server, .env variables are incomplete.`);
  }
  if (Number.isNaN(parseInt(PORT)) || parseInt(PORT) > 65536 || parseInt(PORT) < 1024) {
    throw new Error(
      `Cannot start app server, PORT is not a valid number. Ranges should be 1025 - 65535`
    );
  }
  app.listen(parseInt(PORT), () => {
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
