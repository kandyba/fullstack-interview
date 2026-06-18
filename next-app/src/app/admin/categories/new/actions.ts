"use server";

import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import CategoryModel from "@/models/Category";

function parseRequiredField(formData: FormData, field: string): string {
  return String(formData.get(field) ?? "").trim();
}

function redirectWithError(message: string): never {
  const params = new URLSearchParams({ error: message });
  redirect(`/admin/categories/new?${params.toString()}`);
}

export async function createCategoryAction(formData: FormData) {
  const title = parseRequiredField(formData, "title");
  const slug = parseRequiredField(formData, "slug");
  const descriptionRaw = String(formData.get("description") ?? "").trim();
  const orderRaw = String(formData.get("order") ?? "").trim();

  if (!title) redirectWithError("Title is required");
  if (!slug) redirectWithError("Slug is required");

  let order = 0;
  if (orderRaw) {
    const parsed = Number(orderRaw);
    if (!Number.isFinite(parsed)) {
      redirectWithError("Order must be a number");
    }
    order = parsed;
  }

  await connectToDatabase();

  const existingCategory = await CategoryModel.findOne({ slug })
    .select("_id")
    .lean();
  if (existingCategory) {
    redirectWithError("Category with this slug already exists");
  }

  await CategoryModel.create({
    title,
    slug,
    description: descriptionRaw || undefined,
    order,
  });

  const successParams = new URLSearchParams({ success: "1", slug });
  redirect(`/admin/categories/new?${successParams.toString()}`);
}
