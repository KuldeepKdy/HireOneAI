import express from "express";
import { GoogleAuth, logOut, useCoins } from "../controllers/auth.controllers.js";

const authRouter = express.Router();


authRouter.post("/login", GoogleAuth);

authRouter.get("/logout", logOut);

uthRouter.get("/use-coins", useCoins);

export default authRouter;