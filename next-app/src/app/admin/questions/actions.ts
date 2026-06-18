"use server";

import mongoose from "mongoose";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import CategoryModel from "@/models/Category";
import QuestionModel from "@/models/Question";
import type {
  FullAnswerAccess,
  QuestionStatus,
  TrickyQuestion,
} from "@/types/interview";

const fullAnswerAccessValues = new Set<FullAnswerAccess>(["free", "premium"]);
const statusValues = new Set<QuestionStatus>(["draft", "published", "archived"]);

function parseRequiredField(formData: FormData, field: string): string {
  return String(formData.get(field) ?? "").trim();
}

function parseTrickyQuestion(formData: FormData) {
  const question = String(formData.get("trickyQuestionQuestion") ?? "").trim();
  const answer = String(formData.get("trickyQuestionAnswer") ?? "");

  if (!question.trim() && !answer.trim()) {
    return { trickyQuestion: undefined } as const;
  }

  if (!question.trim()) {
    return {
      error: "Tricky question text is required when answer is provided",
    } as const;
  }

  const trickyQuestion: TrickyQuestion = {
    question,
    answer,
  };

  return { trickyQuestion } as const;
}

function parseQuestionPayload(formData: FormData) {
  const categorySlug = parseRequiredField(formData, "categorySlug");
  const sectionSlugRaw = parseRequiredField(formData, "sectionSlug");
  const slug = parseRequiredField(formData, "slug");
  const question = parseRequiredField(formData, "question");
  const shortAnswer = parseRequiredField(formData, "shortAnswer");
  const fullAnswer = parseRequiredField(formData, "fullAnswer");
  const fullAnswerAccessRaw = parseRequiredField(formData, "fullAnswerAccess");
  const statusRaw = parseRequiredField(formData, "status");

  if (!slug) return { error: "Slug is required" } as const;
  if (!question) return { error: "Question is required" } as const;
  if (!shortAnswer) return { error: "Short answer is required" } as const;
  if (!fullAnswer) return { error: "Full answer is required" } as const;
  if (!categorySlug) return { error: "Category slug is required" } as const;

  const fullAnswerAccess: FullAnswerAccess = fullAnswerAccessValues.has(
    fullAnswerAccessRaw as FullAnswerAccess
  )
    ? (fullAnswerAccessRaw as FullAnswerAccess)
    : "premium";

  const status: QuestionStatus = statusValues.has(statusRaw as QuestionStatus)
    ? (statusRaw as QuestionStatus)
    : "published";

  const parsedTrickyQuestion = parseTrickyQuestion(formData);
  if ("error" in parsedTrickyQuestion) {
    return { error: parsedTrickyQuestion.error } as const;
  }

  return {
    data: {
      slug,
      question,
      shortAnswer,
      fullAnswer,
      fullAnswerAccess,
      categorySlug,
      sectionSlug: sectionSlugRaw || undefined,
      status,
      trickyQuestion: parsedTrickyQuestion.trickyQuestion,
    },
  } as const;
}

export async function createQuestionAction(formData: FormData) {
  const parsed = parseQuestionPayload(formData);
  if ("error" in parsed) {
    redirect(
      `/admin/questions/new?error=${encodeURIComponent(
        parsed.error || "Invalid question payload"
      )}`
    );
  }

  console.log("[createQuestionAction] MONGODB_URI:", process.env.MONGODB_URI);
  await connectToDatabase();
  console.log("[createQuestionAction] Connection successful. DB name:", mongoose.connection.name);

  const categoryExists = await CategoryModel.exists({
    slug: parsed.data.categorySlug,
  });
  if (!categoryExists) {
    redirect(
      `/admin/questions/new?error=${encodeURIComponent(
        "Category with this slug was not found"
      )}`
    );
  }

  const existingQuestion = await QuestionModel.findOne({ slug: parsed.data.slug })
    .select("_id")
    .lean();
  if (existingQuestion) {
    redirect(
      `/admin/questions/new?error=${encodeURIComponent(
        "Question with this slug already exists"
      )}`
    );
  }

  const maxOrderQuestion = await QuestionModel.findOne({
    categorySlug: parsed.data.categorySlug,
  })
    .sort({ order: -1, createdAt: -1 })
    .select("order")
    .lean();

  const maxOrder = maxOrderQuestion?.order ?? 0;
  const nextOrder = Number.isFinite(maxOrder) ? Number(maxOrder) + 1 : 1;

  const createdQuestion = await QuestionModel.create({
    ...parsed.data,
    difficulty: "junior",
    order: nextOrder,
  });
  console.log("[createQuestionAction] Question created:", {
    _id: String(createdQuestion._id),
    slug: createdQuestion.slug,
    categorySlug: createdQuestion.categorySlug,
    status: createdQuestion.status,
  });

  const successParams = new URLSearchParams({
    success: "1",
    categorySlug: createdQuestion.categorySlug,
    slug: createdQuestion.slug,
    questionId: String(createdQuestion._id),
    status: createdQuestion.status,
  });
  redirect(`/admin/questions/new?${successParams.toString()}`);
}

export async function updateQuestionAction(formData: FormData) {
  const questionId = parseRequiredField(formData, "questionId");
  if (!questionId) {
    redirect(
      `/admin/questions?error=${encodeURIComponent("Question id is required")}`
    );
  }

  const parsed = parseQuestionPayload(formData);
  if ("error" in parsed) {
    redirect(
      `/admin/questions/${questionId}/edit?error=${encodeURIComponent(
        parsed.error || "Invalid question payload"
      )}`
    );
  }

  await connectToDatabase();

  const categoryExists = await CategoryModel.exists({
    slug: parsed.data.categorySlug,
  });
  if (!categoryExists) {
    redirect(
      `/admin/questions/${questionId}/edit?error=${encodeURIComponent(
        "Category with this slug was not found"
      )}`
    );
  }

  const existingQuestion = await QuestionModel.findOne({
    slug: parsed.data.slug,
    _id: { $ne: questionId },
  })
    .select("_id")
    .lean();

  if (existingQuestion) {
    redirect(
      `/admin/questions/${questionId}/edit?error=${encodeURIComponent(
        "Question with this slug already exists"
      )}`
    );
  }

  const updated = await QuestionModel.findByIdAndUpdate(questionId, parsed.data, {
    runValidators: true,
    new: true,
  })
    .select("_id")
    .lean();

  if (!updated) {
    redirect(
      `/admin/questions?error=${encodeURIComponent("Question was not found")}`
    );
  }

  const successParams = new URLSearchParams({
    success: "1",
    categorySlug: parsed.data.categorySlug,
    slug: parsed.data.slug,
  });
  redirect(`/admin/questions/${questionId}/edit?${successParams.toString()}`);
}

export async function deleteQuestionAction(formData: FormData) {
  const questionId = parseRequiredField(formData, "questionId");
  if (!questionId) {
    redirect(
      `/admin/questions?error=${encodeURIComponent("Question id is required")}`
    );
  }

  await connectToDatabase();
  await QuestionModel.findByIdAndDelete(questionId);
  redirect(`/admin/questions?success=${encodeURIComponent("Question deleted")}`);
}
