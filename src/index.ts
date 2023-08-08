import express from "express";

const app = express();

import cors from "cors";

app.use(cors());
app.use("/", (req, res) => {
  res.json({
    data: "Hello world!"
  })
})

app.listen(5000, () => {
  console.log("System is now running!")
})