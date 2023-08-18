import { Router } from "express";
import * as authController from "./auth.controller";

export const adminAuthRouter = Router();

adminAuthRouter.post('/login', authController.getAdmin);
adminAuthRouter.post('/signup', (req, res) => {
  res.send("Sign Up")
});