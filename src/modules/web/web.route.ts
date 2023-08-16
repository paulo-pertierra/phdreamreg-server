import { Router } from 'express';

export const webRouter = Router();

webRouter.get('/', (req, res) => {
  res.sendFile(__dirname + '/pages/index.html');
  return;
});
