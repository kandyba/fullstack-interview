import Link from "next/link";
import { getAllCategories } from "@/lib/interview";
import { createQuestionAction } from "@/app/admin/questions/actions";
import QuestionForm from "@/components/admin/QuestionForm";

interface Props {
  searchParams: Promise<{
    success?: string;
    error?: string;
    categorySlug?: string;
    slug?: string;
    questionId?: string;
    status?: string;
  }>;
}

export default async function NewQuestionAdminPage({ searchParams }: Props) {
  const categories = await getAllCategories();
  const params = await searchParams;
  const error = params.error;
  const success = params.success === "1";
  const createdCategorySlug = params.categorySlug;
  const createdSlug = params.slug;
  const createdQuestionId = params.questionId;
  const createdStatus = params.status;

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Нове питання</h1>
        <p className="mt-1 text-sm text-slate-400">
          Локальна адмінка для створення записів у колекції questions.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-rose-900/50 bg-rose-950/30 px-4 py-3 text-sm text-rose-300">
          {error}
        </div>
      )}

      {success && createdCategorySlug && (
        <div className="mb-4 rounded-lg border border-emerald-900/50 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-300">
          <p className="font-semibold">✓ Питання успішно створено!</p>
          <div className="mt-2 space-y-1 font-mono text-xs">
            <p>ID: <span className="text-emerald-100">{createdQuestionId}</span></p>
            <p>Slug: <span className="text-emerald-100">{createdSlug}</span></p>
            <p>Category: <span className="text-emerald-100">{createdCategorySlug}</span></p>
            <p>Status: <span className="text-emerald-100">{createdStatus}</span></p>
          </div>
          <Link
            href={`/questions/${createdCategorySlug}`}
            className="mt-3 inline-block text-emerald-200 underline hover:text-emerald-100"
          >
            Перейти до теми /questions/{createdCategorySlug}
          </Link>
        </div>
      )}

      <QuestionForm
        mode="create"
        categories={categories}
        formAction={createQuestionAction}
        submitLabel="Створити питання"
      />
    </div>
  );
}
