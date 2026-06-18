"use server";

import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import CategoryModel from "@/models/Category";
import GroupModel from "@/models/Group";
import QuestionModel from "@/models/Question";

function parseRequiredField(formData: FormData, field: string): string {
  return String(formData.get(field) ?? "").trim();
}

function parseCategoryPayload(formData: FormData) {
  const title = parseRequiredField(formData, "title");
  const slug = parseRequiredField(formData, "slug");
  const groupSlug = parseRequiredField(formData, "groupSlug");
  const descriptionRaw = String(formData.get("description") ?? "").trim();
  const orderRaw = String(formData.get("order") ?? "").trim();

  if (!title) return { error: "Title is required" } as const;
  if (!slug) return { error: "Slug is required" } as const;
  if (!groupSlug) return { error: "Group is required" } as const;

  let order = 0;
  if (orderRaw) {
    const parsed = Number(orderRaw);
    if (!Number.isFinite(parsed)) {
      return { error: "Order must be a number" } as const;
    }
    order = parsed;
  }

  return {
    data: {
      title,
      slug,
      groupSlug,
      description: descriptionRaw || undefined,
      order,
    },
  } as const;
}

export async function createCategoryAction(formData: FormData) {
  const parsed = parseCategoryPayload(formData);
  if ("error" in parsed) {
    redirect(
      `/admin/categories/new?error=${encodeURIComponent(
        parsed.error || "Invalid category payload"
      )}`
    );
  }

  await connectToDatabase();

  const groupExists = await GroupModel.exists({ slug: parsed.data.groupSlug });
  if (!groupExists) {
    redirect(
      `/admin/categories/new?error=${encodeURIComponent(
        "Group with this slug was not found"
      )}`
    );
  }

  const existingCategory = await CategoryModel.findOne({ slug: parsed.data.slug })
    .select("_id")
    .lean();
  if (existingCategory) {
    redirect(
      `/admin/categories/new?error=${encodeURIComponent(
        "Category with this slug already exists"
      )}`
    );
  }

  await CategoryModel.create(parsed.data);

  const successParams = new URLSearchParams({
    success: "1",
    slug: parsed.data.slug,
  });
  redirect(`/admin/categories/new?${successParams.toString()}`);
}

export async function updateCategoryAction(formData: FormData) {
  const categoryId = parseRequiredField(formData, "categoryId");
  if (!categoryId) {
    redirect(
      `/admin/categories?error=${encodeURIComponent("Category id is required")}`
    );
  }

  const parsed = parseCategoryPayload(formData);
  if ("error" in parsed) {
    redirect(
      `/admin/categories/${categoryId}/edit?error=${encodeURIComponent(
        parsed.error || "Invalid category payload"
      )}`
    );
  }

  await connectToDatabase();

  const groupExists = await GroupModel.exists({ slug: parsed.data.groupSlug });
  if (!groupExists) {
    redirect(
      `/admin/categories/${categoryId}/edit?error=${encodeURIComponent(
        "Group with this slug was not found"
      )}`
    );
  }

  const existingCategory = await CategoryModel.findOne({
    slug: parsed.data.slug,
    _id: { $ne: categoryId },
  })
    .select("_id")
    .lean();

  if (existingCategory) {
    redirect(
      `/admin/categories/${categoryId}/edit?error=${encodeURIComponent(
        "Category with this slug already exists"
      )}`
    );
  }

  const updated = await CategoryModel.findByIdAndUpdate(categoryId, parsed.data, {
    runValidators: true,
    new: true,
  })
    .select("_id")
    .lean();

  if (!updated) {
    redirect(
      `/admin/categories?error=${encodeURIComponent("Category was not found")}`
    );
  }

  const successParams = new URLSearchParams({
    success: "1",
    slug: parsed.data.slug,
  });
  redirect(`/admin/categories/${categoryId}/edit?${successParams.toString()}`);
}

export async function deleteCategoryAction(formData: FormData) {
  const categoryId = parseRequiredField(formData, "categoryId");
  if (!categoryId) {
    redirect(
      `/admin/categories?error=${encodeURIComponent("Category id is required")}`
    );
  }

  await connectToDatabase();

  const category = await CategoryModel.findById(categoryId).select("slug").lean();
  if (!category) {
    redirect(
      `/admin/categories?error=${encodeURIComponent("Category was not found")}`
    );
  }

  const linkedQuestionsCount = await QuestionModel.countDocuments({
    categorySlug: category.slug,
  });

  if (linkedQuestionsCount > 0) {
    redirect(
      `/admin/categories?error=${encodeURIComponent(
        "Неможливо видалити категорію, бо до неї привʼязані питання."
      )}`
    );
  }

  await CategoryModel.findByIdAndDelete(categoryId);
  redirect(`/admin/categories?success=${encodeURIComponent("Category deleted")}`);
}
