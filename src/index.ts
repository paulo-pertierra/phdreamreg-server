import express from "express";
import compression from "compression";
import dotenv from "dotenv";


dotenv.config();

const app = express();

import cors from "cors";

app.use(cors());
app.use(compression({ threshold: 0 }))
app.use(express.json())
app.use(express.static(__dirname + "/../public"))
console.log(__dirname + "/public")

import { apiRouter } from "./modules/apiRouter";
app.use("/api", apiRouter)

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/index.html");
})

app.use("/healthz", (req, res) => {
  res.status(200).json({
    ping: "pong"
  })
})

app.use((req, res) => {
  let bannedEmails = ['deguzmaneric09@gmail.com', 'jummelastefanecatalantibig@gmail.com']
  bannedEmails.forEach(email => {
    if (req.body.contactEmail === email) {
      res.status(400).json({
        msg: "Bawal ka dito"
      })
      return;
    }
  });
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`System is now running at http://localhost:${PORT}`)
})