import express from "express";

// to excess env data in this file
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 6000;


app.get("/", (req, res) => {
  res.send("hello from gateway");
});

// port ko listen karya hai
app.listen(PORT, () => {
  console.log(`Gateway Started on ${PORT}`);
});
