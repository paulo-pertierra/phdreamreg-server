import { Router } from 'express';

export const healthzRouter = Router();

healthzRouter.use('/', (req, res) => {
  res.status(200).json({
    ping: 'pong'
  });
  return;
});
