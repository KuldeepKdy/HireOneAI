import express from "express";

// to excess env data in this file
import dotenv from "dotenv";
import { connectDB } from "./configs/db.js";
import billingRouter from "./routes/billing.route.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 6005;

app.get("/", (req, res) => {
  res.send("Billing Service is running");
});

app.use("/", billingRouter);

// port ko listen karya hai
app.listen(PORT, () => {
  console.log(`Billing-Service Started on ${PORT}`);
  connectDB()
});
