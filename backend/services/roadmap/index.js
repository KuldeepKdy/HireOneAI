import express from "express";

// to excess env data in this file
import dotenv from "dotenv";
import { connectDB } from "./configs/db.js";
import roadmapRouter from "./routes/roadmap.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 6004;

app.use("/", roadmapRouter);

// port ko listen karya hai
app.listen(PORT, () => {
  console.log(`Roadmap-Service Started on ${PORT}`);
  connectDB();
});
