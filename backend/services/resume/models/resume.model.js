import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      index: true,
    },
    extractedText: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    summary: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      defalut: "",
    },
    education: {
      type: [{}],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
    },
    projects: {
      type: [{}],
      default: [],
    },
    experience: {
      type: [{}],
      default: [],
    },
    strengths: {
      type: [String],
      default: [],
    },
    weaknesses: {
      type: [String],
      default: [],
    },
    missingskills: {
      type: [String],
      defualt: [],
    },
    suggestedRole: {
      type: String,
      default: "",
    },
    recommendations: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;