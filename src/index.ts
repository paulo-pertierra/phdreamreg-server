import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

import cors from "cors";

app.use(cors());
app.use(express.json())

import { registreeRouter } from "./modules/registree/regsitree.route";
app.use("/register", registreeRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`System is now running at http://localhost:${PORT}`)
})