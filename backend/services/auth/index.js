import express from "express";

// to excess env data in this file
import dotenv from "dotenv";
import { connectDB } from "./configs/db.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 6001;


app.get("/", (req, res) => {
  res.send("hello from Auth-Service");
});

// port ko listen karya hai
app.listen(PORT, () => {
  console.log(`Auth-Service Started on ${PORT}`);
  connectDB();
});
