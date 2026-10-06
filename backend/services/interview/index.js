import express from "express";

// to excess env data in this file
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import interviewRouter from "./routes/interview.route.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 6003;

app.get("/", (req, res) => {
  res.send("hello from interview-Service");
});

//redirect on routes
app.use("/", interviewRouter);

// port ko listen karya hai
app.listen(PORT, () => {
  console.log(`Interview-Service Started on ${PORT}`);
  connectDB();
});
