import express from "express";
import { GoogleAuth, logOut } from "../controllers/auth.controllers.js";

const authRouter = express.Router();


authRouter.post("/login", GoogleAuth);

authRouter.get("/logout", logOut);

export default authRouter;