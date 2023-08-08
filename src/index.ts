import express from "express";

const app = express();

import cors from "cors";

app.use(cors());
app.use(express.json())

import { registreeRouter } from "./modules/registree/regsitree.route";
app.use("/register", registreeRouter)

app.listen(5000, () => {
  console.log("System is now running!")
})