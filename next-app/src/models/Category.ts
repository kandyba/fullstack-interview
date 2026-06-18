import { Schema, model, models } from "mongoose";
import type { Category } from "@/types/interview";

const CategorySchema = new Schema<Category>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    groupSlug: { type: String, required: true, index: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const CategoryModel =
  models.Category ?? model<Category>("Category", CategorySchema);

export default CategoryModel;
