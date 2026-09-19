import express from "express";

// to excess env data in this file
import dotenv from "dotenv";
dotenv.config();

import proxy from "express-http-proxy";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { getCurrentUser } from "./controllers/user.controller.js";
import { isAuth } from "./middleware/isAuth.js";
import { proxyWithHeaders } from "./utils/proxyWithHeaders.js";

const app = express();
// to parse json data to frontend
app.use(express.json());

// to allow cross origin requests from frontend to backend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
// koi b response ho vo terminal pai show ho
app.use(morgan("dev"));

// to parse cookies
app.use(cookieParser());

const PORT = process.env.PORT || 6000;

app.get("/", (req, res) => {
  res.send("hello from gateway");
});

//auth service
app.use("/api/auth", proxy(process.env.AUTH_SERVICE_URL));
app.use("/api/resume",isAuth, proxyWithHeaders(process.env.RESUME_SERVICE_URL));
app.get("/api/me", isAuth, getCurrentUser);


// port ko listen karya hai
app.listen(PORT, () => {
  console.log(`Gateway Started on ${PORT}`);
});
