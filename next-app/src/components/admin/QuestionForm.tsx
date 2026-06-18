"use client";

import Link from "next/link";
import { useState } from "react";
import slugify from "slugify";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import CustomSelect from "@/components/admin/CustomSelect";
import type {
  Category,
  FullAnswerAccess,
  InterviewQuestion,
  QuestionStatus,
} from "@/types/interview";

function generateSlugFromQuestion(question: string, categorySlug: string): string {
  if (!question || !categorySlug) return "";

  const slug = slugify(question, {
    lower: true,
    locale: "uk",
    strict: true,
  });

  return slug ? `${categorySlug}-${slug}` : "";
}

function generateSectionSlugFromCategory(categorySlug: string): string {
  return categorySlug ? `${categorySlug}-core` : "";
}

interface QuestionFormProps {
  mode: "create" | "edit";
  categories: Category[];
  formAction: (formData: FormData) => void | Promise<void>;
  initialData?: InterviewQuestion;
  submitLabel: string;
}

export default function QuestionForm({
  mode,
  categories,
  formAction,
  initialData,
  submitLabel,
}: QuestionFormProps) {
  const hasCategories = categories.length > 0;
  const [fullAnswer, setFullAnswer] = useState(initialData?.fullAnswer ?? "");
  const [trickyQuestionQuestion, setTrickyQuestionQuestion] = useState(
    initialData?.trickyQuestion?.question ?? ""
  );
  const [trickyQuestionAnswer, setTrickyQuestionAnswer] = useState(
    initialData?.trickyQuestion?.answer ?? ""
  );

  const [question, setQuestion] = useState(initialData?.question ?? "");
  const [categorySlug, setCategorySlug] = useState(initialData?.categorySlug ?? "");
  const [sectionSlug, setSectionSlug] = useState(initialData?.sectionSlug ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [fullAnswerAccess, setFullAnswerAccess] = useState<FullAnswerAccess>(
    mode === "edit" ? initialData?.fullAnswerAccess ?? "premium" : "premium"
  );
  const [status, setStatus] = useState<QuestionStatus>(
    initialData?.status ?? "published"
  );

  const categoryOptions = categories.map((category) => ({
    label: category.title,
    value: category.slug,
  }));

  const [hasUserEditedSlug, setHasUserEditedSlug] = useState(mode === "edit");
  const [hasUserEditedSectionSlug, setHasUserEditedSectionSlug] = useState(mode === "edit");

  const handleQuestionChange = (value: string) => {
    setQuestion(value);
    if (!hasUserEditedSlug) {
      setSlug(generateSlugFromQuestion(value, categorySlug));
    }
  };

  const handleCategoryChange = (value: string) => {
    setCategorySlug(value);
    if (!hasUserEditedSlug) {
      setSlug(generateSlugFromQuestion(question, value));
    }
    if (!hasUserEditedSectionSlug) {
      setSectionSlug(generateSectionSlugFromCategory(value));
    }
  };



  const handleSlugChange = (value: string) => {
    setSlug(value);
    if (value !== generateSlugFromQuestion(question, categorySlug)) {
      setHasUserEditedSlug(true);
    }
  };

  const handleSectionSlugChange = (value: string) => {
    setSectionSlug(value);
    if (value !== generateSectionSlugFromCategory(categorySlug)) {
      setHasUserEditedSectionSlug(true);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      {!hasCategories && (
        <div className="mb-4 rounded-lg border border-amber-900/50 bg-amber-950/30 px-4 py-3 text-sm text-amber-200">
          <p>Спочатку створіть категорію.</p>
          <Link
            href="/admin/categories/new"
            className="mt-1 inline-block text-amber-100 underline hover:text-white"
          >
            Створити категорію
          </Link>
        </div>
      )}

      <form action={formAction} className="space-y-5 rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        {mode === "edit" && initialData?._id && (
          <input type="hidden" name="questionId" value={initialData._id} />
        )}

        <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-950/35 p-5">
          <h3 className="text-sm font-semibold text-slate-200">Основна інформація</h3>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <CustomSelect
              label="Категорія"
              name="categorySlug"
              value={categorySlug}
              options={categoryOptions}
              onChange={handleCategoryChange}
              placeholder="Обери категорію"
              required
              disabled={!hasCategories}
            />

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-200" htmlFor="sectionSlug">
                Section Slug
              </label>
              <input
                id="sectionSlug"
                name="sectionSlug"
                type="text"
                placeholder="react-core"
                value={sectionSlug}
                onChange={(event) => handleSectionSlugChange(event.target.value)}
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500"
              />
              <p className="mt-1 text-xs text-slate-500">
                Section slug допомагає групувати питання всередину категорії.
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-200" htmlFor="slug">
                Slug
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                required
                placeholder="react-use-state"
                value={slug}
                onChange={(event) => handleSlugChange(event.target.value)}
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500"
              />
              <p className="mt-1 text-xs text-slate-500">
                Slug використовується як унікальний ідентифікатор питання. Генерується автоматично з питання і категорії.
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-200" htmlFor="question">
                Питання
              </label>
              <textarea
                id="question"
                name="question"
                required
                rows={3}
                value={question}
                onChange={(event) => handleQuestionChange(event.target.value)}
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-950/35 p-5">
          <h3 className="text-sm font-semibold text-slate-200">Відповіді</h3>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-200" htmlFor="shortAnswer">
              Коротка відповідь
            </label>
            <textarea
              id="shortAnswer"
              name="shortAnswer"
              required
              rows={4}
              defaultValue={initialData?.shortAnswer ?? ""}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-200" htmlFor="fullAnswer">
              Розгорнута відповідь
            </label>
            <textarea
              id="fullAnswer"
              name="fullAnswer"
              required
              rows={12}
              value={fullAnswer}
              onChange={(event) => setFullAnswer(event.target.value)}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-slate-500">
              Зберігається як Markdown-рядок (без HTML).
            </p>
            <div className="mt-3 rounded-lg border border-slate-800 bg-slate-950/60 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Preview
              </p>
              {fullAnswer.trim() ? (
                <MarkdownRenderer content={fullAnswer} />
              ) : (
                <p className="text-sm text-slate-500">Введи Markdown, щоб побачити прев&apos;ю.</p>
              )}
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-950/35 p-5">
          <h3 className="text-sm font-semibold text-slate-200">Підступне питання</h3>

          <div className="grid gap-3">
            <div>
              <label
                className="mb-1 block text-xs font-medium text-slate-300"
                htmlFor="trickyQuestionQuestion"
              >
                trickyQuestion.question
              </label>
              <textarea
                id="trickyQuestionQuestion"
                name="trickyQuestionQuestion"
                rows={2}
                value={trickyQuestionQuestion}
                onChange={(event) => setTrickyQuestionQuestion(event.target.value)}
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500"
                placeholder="Сформулюй підступне питання"
              />
            </div>

            <div>
              <label
                className="mb-1 block text-xs font-medium text-slate-300"
                htmlFor="trickyQuestionAnswer"
              >
                trickyQuestion.answer (Markdown)
              </label>
              <textarea
                id="trickyQuestionAnswer"
                name="trickyQuestionAnswer"
                rows={4}
                value={trickyQuestionAnswer}
                onChange={(event) => setTrickyQuestionAnswer(event.target.value)}
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500"
                placeholder="Відповідь у Markdown"
              />
            </div>

            <div className="rounded-md border border-slate-800 bg-slate-950/70 p-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Preview answer
              </p>
              {trickyQuestionAnswer.trim() ? (
                <MarkdownRenderer content={trickyQuestionAnswer} />
              ) : (
                <p className="text-sm text-slate-500">Відповідь порожня.</p>
              )}
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-950/35 p-5">
          <h3 className="text-sm font-semibold text-slate-200">Налаштування</h3>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <CustomSelect
              label="fullAnswerAccess"
              name="fullAnswerAccess"
              value={fullAnswerAccess}
              onChange={(value) => setFullAnswerAccess(value as FullAnswerAccess)}
              options={[
                { label: "premium", value: "premium" },
                { label: "free", value: "free" },
              ]}
            />

            <CustomSelect
              label="status"
              name="status"
              value={status}
              onChange={(value) => setStatus(value as QuestionStatus)}
              options={[
                { label: "draft", value: "draft" },
                { label: "published", value: "published" },
                { label: "archived", value: "archived" },
              ]}
            />
          </div>
        </section>

        <div>
          <button
            type="submit"
            disabled={!hasCategories}
            className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
