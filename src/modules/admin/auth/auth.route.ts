import { Router } from "express";

export const adminAuthRouter = Router();

adminAuthRouter.post('/login', (req, res) => {
  res.send("Log In")
});
adminAuthRouter.post('/signup', (req, res) => {
  res.send("Sign Up")
});