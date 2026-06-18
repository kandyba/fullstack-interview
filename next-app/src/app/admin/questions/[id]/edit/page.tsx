import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCategories } from "@/lib/interview";
import { connectToDatabase } from "@/lib/mongodb";
import QuestionModel from "@/models/Question";
import QuestionForm from "@/components/admin/QuestionForm";
import { updateQuestionAction } from "@/app/admin/questions/actions";
import type { InterviewQuestion } from "@/types/interview";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    success?: string;
    error?: string;
    categorySlug?: string;
    slug?: string;
  }>;
}

export default async function EditQuestionAdminPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const query = await searchParams;

  await connectToDatabase();
  const questionDoc = await QuestionModel.findById(id).lean();
  if (!questionDoc) {
    notFound();
  }

  const categories = await getAllCategories();
  const initialData: InterviewQuestion = {
    ...(questionDoc as unknown as InterviewQuestion),
    _id: String(questionDoc._id),
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Редагувати питання</h1>
        <p className="mt-1 text-sm text-slate-400">Оновлення існуючого питання в MongoDB.</p>
      </div>

      {query.error && (
        <div className="mb-4 rounded-lg border border-rose-900/50 bg-rose-950/30 px-4 py-3 text-sm text-rose-300">
          {query.error}
        </div>
      )}

      {query.success === "1" && (
        <div className="mb-4 rounded-lg border border-emerald-900/50 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-300">
          <p>Питання успішно оновлено.</p>
          <div className="mt-2 flex flex-wrap gap-4">
            <Link href="/admin/questions" className="text-emerald-200 underline hover:text-emerald-100">
              Назад до /admin/questions
            </Link>
            {query.categorySlug && (
              <Link
                href={`/questions/${query.categorySlug}`}
                className="text-emerald-200 underline hover:text-emerald-100"
              >
                Перейти до /questions/{query.categorySlug}
              </Link>
            )}
          </div>
        </div>
      )}

      <QuestionForm
        mode="edit"
        categories={categories}
        initialData={initialData}
        formAction={updateQuestionAction}
        submitLabel="Зберегти зміни"
      />
    </div>
  );
}
