import express from "express";

// to excess env data in this file
import dotenv from "dotenv";
import { connectDB } from "./configs/db";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 6004;

app.get("/", (req, res) => {
  res.send("hello from roadmap-Service");
});

// port ko listen karya hai
app.listen(PORT, () => {
  console.log(`Roadmap-Service Started on ${PORT}`);
  connectDB();
});
