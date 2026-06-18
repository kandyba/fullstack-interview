"use server";

import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import CategoryModel from "@/models/Category";
import QuestionModel from "@/models/Question";
import type {
  Difficulty,
  FullAnswerAccess,
  QuestionStatus,
  TrickyQuestion,
} from "@/types/interview";

const fullAnswerAccessValues = new Set<FullAnswerAccess>(["free", "premium"]);
const difficultyValues = new Set<Difficulty>(["junior", "middle", "senior"]);
const statusValues = new Set<QuestionStatus>(["draft", "published", "archived"]);

function parseRequiredField(formData: FormData, field: string): string {
  return String(formData.get(field) ?? "").trim();
}

function redirectWithError(message: string): never {
  const params = new URLSearchParams({ error: message });
  redirect(`/admin/questions/new?${params.toString()}`);
}

export async function createQuestionAction(formData: FormData) {
  const categorySlug = parseRequiredField(formData, "categorySlug");
  const sectionSlugRaw = parseRequiredField(formData, "sectionSlug");
  const slug = parseRequiredField(formData, "slug");
  const question = parseRequiredField(formData, "question");
  const shortAnswer = parseRequiredField(formData, "shortAnswer");
  const fullAnswer = parseRequiredField(formData, "fullAnswer");
  const fullAnswerAccessRaw = parseRequiredField(formData, "fullAnswerAccess");
  const difficultyRaw = parseRequiredField(formData, "difficulty");
  const orderRaw = parseRequiredField(formData, "order");
  const statusRaw = parseRequiredField(formData, "status");
  const trickyQuestionQuestion = String(
    formData.get("trickyQuestionQuestion") ?? ""
  ).trim();
  const trickyQuestionAnswer = String(formData.get("trickyQuestionAnswer") ?? "");

  if (!slug) redirectWithError("Slug is required");
  if (!question) redirectWithError("Question is required");
  if (!shortAnswer) redirectWithError("Short answer is required");
  if (!fullAnswer) redirectWithError("Full answer is required");
  if (!categorySlug) redirectWithError("Category slug is required");

  const fullAnswerAccess: FullAnswerAccess = fullAnswerAccessValues.has(
    fullAnswerAccessRaw as FullAnswerAccess
  )
    ? (fullAnswerAccessRaw as FullAnswerAccess)
    : "premium";

  const difficulty: Difficulty = difficultyValues.has(difficultyRaw as Difficulty)
    ? (difficultyRaw as Difficulty)
    : "junior";

  const status: QuestionStatus = statusValues.has(statusRaw as QuestionStatus)
    ? (statusRaw as QuestionStatus)
    : "published";

  let order: number | undefined;
  if (orderRaw) {
    const parsedOrder = Number(orderRaw);
    if (!Number.isFinite(parsedOrder)) {
      redirectWithError("Order must be a number");
    }
    order = parsedOrder;
  }

  let trickyQuestion: TrickyQuestion | undefined;
  if (trickyQuestionQuestion || trickyQuestionAnswer.trim()) {
    if (!trickyQuestionQuestion) {
      redirectWithError("Tricky question text is required when answer is provided");
    }

    trickyQuestion = {
      question: trickyQuestionQuestion,
      answer: trickyQuestionAnswer,
    };
  }

  await connectToDatabase();

  const categoryExists = await CategoryModel.exists({ slug: categorySlug });
  if (!categoryExists) {
    redirectWithError("Category with this slug was not found");
  }

  const existingQuestion = await QuestionModel.findOne({ slug })
    .select("_id")
    .lean();
  if (existingQuestion) {
    redirectWithError("Question with this slug already exists");
  }

  await QuestionModel.create({
    slug,
    question,
    shortAnswer,
    fullAnswer,
    fullAnswerAccess,
    categorySlug,
    sectionSlug: sectionSlugRaw || undefined,
    difficulty,
    order,
    status,
    trickyQuestion,
  });

  const successParams = new URLSearchParams({
    success: "1",
    categorySlug,
    slug,
  });

  redirect(`/admin/questions/new?${successParams.toString()}`);
}
