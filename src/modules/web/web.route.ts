import { Router } from 'express';

const webRouter = Router();

webRouter.get('/', (req, res) => {
  res.sendFile(__dirname + '/pages/index.html');
  return;
});

export default webRouter;
