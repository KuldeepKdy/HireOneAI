import express from "express";
import {
  getAllInterviews,
  getInterview,
  startInterview,
  submitAnswer,
} from "../controllers/interview-controller";

const interviewRouter = express.Router();

interviewRouter.post("/start", startInterview);
interviewRouter.post("/answer", submitAnswer);

interviewRouter.get("/:id", getInterview);
interviewRouter.get("/all", getAllInterviews);

export default interviewRouter;
