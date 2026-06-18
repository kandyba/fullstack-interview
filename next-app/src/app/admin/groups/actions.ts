"use server";

import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import CategoryModel from "@/models/Category";
import GroupModel from "@/models/Group";

function parseRequiredField(formData: FormData, field: string): string {
  return String(formData.get(field) ?? "").trim();
}

function parseGroupPayload(formData: FormData) {
  const title = parseRequiredField(formData, "title");
  const slug = parseRequiredField(formData, "slug");
  const descriptionRaw = String(formData.get("description") ?? "").trim();
  const orderRaw = String(formData.get("order") ?? "").trim();

  if (!title) return { error: "Title is required" } as const;
  if (!slug) return { error: "Slug is required" } as const;

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
      description: descriptionRaw || undefined,
      order,
    },
  } as const;
}

export async function createGroupAction(formData: FormData) {
  const parsed = parseGroupPayload(formData);
  if ("error" in parsed) {
    redirect(
      `/admin/groups/new?error=${encodeURIComponent(
        parsed.error || "Invalid group payload"
      )}`
    );
  }

  await connectToDatabase();

  const existingGroup = await GroupModel.findOne({ slug: parsed.data.slug })
    .select("_id")
    .lean();
  if (existingGroup) {
    redirect(
      `/admin/groups/new?error=${encodeURIComponent(
        "Group with this slug already exists"
      )}`
    );
  }

  await GroupModel.create(parsed.data);

  const successParams = new URLSearchParams({
    success: "1",
    slug: parsed.data.slug,
  });
  redirect(`/admin/groups/new?${successParams.toString()}`);
}

export async function deleteGroupAction(formData: FormData) {
  const groupId = parseRequiredField(formData, "groupId");
  if (!groupId) {
    redirect(`/admin/groups?error=${encodeURIComponent("Group id is required")}`);
  }

  await connectToDatabase();

  const group = await GroupModel.findById(groupId).select("slug").lean();
  if (!group) {
    redirect(`/admin/groups?error=${encodeURIComponent("Group was not found")}`);
  }

  const linkedCategoriesCount = await CategoryModel.countDocuments({
    groupSlug: group.slug,
  });

  if (linkedCategoriesCount > 0) {
    redirect(
      `/admin/groups?error=${encodeURIComponent(
        "Неможливо видалити group, бо до неї прив'язані категорії."
      )}`
    );
  }

  await GroupModel.findByIdAndDelete(groupId);
  redirect(`/admin/groups?success=${encodeURIComponent("Group deleted")}`);
}
