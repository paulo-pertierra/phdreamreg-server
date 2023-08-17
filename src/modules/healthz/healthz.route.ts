import { Router } from 'express';

const healthzRouter = Router();

healthzRouter.use('/', (req, res) => {
  res.status(200).json({
    ping: 'pong'
  });
  return;
});

export default healthzRouter;