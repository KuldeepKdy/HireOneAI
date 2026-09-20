import express from "express";

// to excess env data in this file
import dotenv from "dotenv";
import { connectDB } from "./configs/db.js";
import resumeRouter from "./routes/resume.route.js";
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 6002;

app.get("/", (req, res) => {
  res.send("hello from Resume-Service");
});

app.use("/", resumeRouter);

// port ko listen karya hai
app.listen(PORT, () => {
  console.log(`Resume-Service Started on ${PORT}`);
  connectDB();
});
