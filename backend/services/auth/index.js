import express from "express";

// to excess env data in this file
import dotenv from "dotenv";
import { connectDB } from "./configs/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 6001;


app.get("/", (req, res) => {
  res.send("hello from Auth-Service");
});

app.use("/", authRouter);

// port ko listen karya hai
app.listen(PORT, () => {
  console.log(`Auth-Service Started on ${PORT}`);
  connectDB();
});
