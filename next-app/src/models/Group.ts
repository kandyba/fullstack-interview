import { Schema, model, models } from "mongoose";
import type { Group } from "@/types/interview";

const GroupSchema = new Schema<Group>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const GroupModel = models.Group ?? model<Group>("Group", GroupSchema);

export default GroupModel;
