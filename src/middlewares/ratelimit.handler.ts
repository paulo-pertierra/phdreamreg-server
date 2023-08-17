import dotenv from 'dotenv';
dotenv.config();

import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { createClient } from 'redis';

const REDIS_URL = process.env.REDIS_URL || '';

const client = createClient({
  url: REDIS_URL
});

const attemptRedisConnect = async () => {
  await client.connect();
}

attemptRedisConnect();

const CD_15_MINUTES = 15 * 60 * 1000;
export default rateLimit({
  windowMs: CD_15_MINUTES,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: (...args: string[]) => client.sendCommand(args)
  })
});
