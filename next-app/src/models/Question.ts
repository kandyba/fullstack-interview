import { Schema, model, models } from "mongoose";
import type { InterviewQuestion } from "@/types/interview";

const QuestionSchema = new Schema<InterviewQuestion>(
  {
    slug: { type: String, required: true, unique: true },
    question: { type: String, required: true },
    shortAnswer: { type: String, required: true },
    fullAnswer: { type: String, required: true },
    fullAnswerAccess: {
      type: String,
      enum: ["free", "premium"],
      default: "premium",
    },
    categorySlug: { type: String, required: true, index: true },
    sectionSlug: { type: String },
    tags: { type: [String], default: [] },
    difficulty: {
      type: String,
      enum: ["junior", "middle", "senior"],
      default: "junior",
    },
    order: { type: Number, default: 0 },
    trickyQuestion: {
      question: { type: String, default: "" },
      answer: { type: String, default: "" },
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
    },
  },
  { timestamps: true }
);

const QuestionModel =
  models.Question ?? model<InterviewQuestion>("Question", QuestionSchema);

export default QuestionModel;
