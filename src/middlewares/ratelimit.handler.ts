import dotenv from 'dotenv';
dotenv.config();

import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || '';

const client = new Redis(REDIS_URL);

const CD_15_MINUTES = 15 * 60 * 1000;
export default rateLimit({
  windowMs: CD_15_MINUTES,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    // @ts-expect-error - Known issue: the `call` function is not present in @types/ioredis
    sendCommand: (...args: string[]) => client.call(...args)
  })
});
