import Link from "next/link";
import { connectToDatabase } from "@/lib/mongodb";
import CategoryModel from "@/models/Category";
import GroupModel from "@/models/Group";
import QuestionModel from "@/models/Question";
import ConfirmActionButton from "@/components/admin/ConfirmActionButton";
import { deleteQuestionAction } from "@/app/admin/questions/actions";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ success?: string; error?: string; categorySlug?: string }>;
}

export default async function AdminQuestionsPage({ searchParams }: Props) {
  const query = await searchParams;
  const selectedCategorySlug = query.categorySlug ?? "";

  await connectToDatabase();
  const [questions, categories, groups] = await Promise.all([
    QuestionModel.find(selectedCategorySlug ? { categorySlug: selectedCategorySlug } : {})
      .sort({ order: 1, createdAt: -1 })
      .lean(),
    CategoryModel.find()
      .sort({ order: 1, title: 1 })
      .select("slug title order groupSlug")
      .lean(),
    GroupModel.find().sort({ order: 1, title: 1 }).select("slug order").lean(),
  ]);

  const categoryLabelBySlug = new Map(
    categories.map((category) => [category.slug, category.title])
  );

  const categoryMetaBySlug = new Map(
    categories.map((category) => [
      category.slug,
      {
        order: category.order ?? 0,
        groupSlug: category.groupSlug,
      },
    ])
  );

  const groupOrderBySlug = new Map(
    groups.map((group) => [group.slug, group.order ?? 0])
  );

  const groupedQuestions = new Map<string, typeof questions>();
  for (const question of questions) {
    const existing = groupedQuestions.get(question.categorySlug) ?? [];
    existing.push(question);
    groupedQuestions.set(question.categorySlug, existing);
  }

  const groupedEntries = Array.from(groupedQuestions.entries())
    .map(([categorySlug, categoryQuestions]) => {
      const sortedQuestions = [...categoryQuestions].sort((a, b) => {
        const orderDiff = (a.order ?? 0) - (b.order ?? 0);
        if (orderDiff !== 0) return orderDiff;

        const createdAtA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const createdAtB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        if (createdAtA !== createdAtB) return createdAtB - createdAtA;

        return String(a.slug).localeCompare(String(b.slug));
      });

      return [categorySlug, sortedQuestions] as const;
    })
    .sort(([categorySlugA], [categorySlugB]) => {
      const categoryA = categoryMetaBySlug.get(categorySlugA);
      const categoryB = categoryMetaBySlug.get(categorySlugB);

      const groupOrderA = groupOrderBySlug.get(categoryA?.groupSlug ?? "") ?? 0;
      const groupOrderB = groupOrderBySlug.get(categoryB?.groupSlug ?? "") ?? 0;
      if (groupOrderA !== groupOrderB) return groupOrderA - groupOrderB;

      const categoryOrderA = categoryA?.order ?? 0;
      const categoryOrderB = categoryB?.order ?? 0;
      if (categoryOrderA !== categoryOrderB) return categoryOrderA - categoryOrderB;

      return categorySlugA.localeCompare(categorySlugB);
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Питання</h1>
          <p className="mt-1 text-sm text-slate-400">
            Усі питання з однієї collection questions, з візуальним групуванням по categorySlug.
          </p>
        </div>
        <Link
          href="/admin/questions/new"
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Створити питання
        </Link>
      </div>

      {query.error && (
        <div className="rounded-lg border border-rose-900/50 bg-rose-950/30 px-4 py-3 text-sm text-rose-300">
          {query.error}
        </div>
      )}

      {query.success && (
        <div className="rounded-lg border border-emerald-900/50 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-300">
          {query.success}
        </div>
      )}

      {categories.length > 0 && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
          <p className="mb-2 text-xs uppercase tracking-wider text-slate-500">Фільтр по категорії</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/questions"
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                !selectedCategorySlug
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-200 hover:bg-slate-700"
              }`}
            >
              Усі
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/admin/questions?categorySlug=${encodeURIComponent(category.slug)}`}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  selectedCategorySlug === category.slug
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                }`}
              >
                {category.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {questions.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
          <p className="text-sm text-slate-400">Поки немає питань.</p>
          <Link
            href="/admin/questions/new"
            className="mt-3 inline-block text-sm text-blue-300 underline hover:text-blue-200"
          >
            Створити питання
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {groupedEntries.map(([categorySlug, categoryQuestions]) => (
            <section
              key={categorySlug}
              className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50"
            >
              <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-3">
                <p className="text-sm font-semibold text-slate-200">
                  {categoryLabelBySlug.get(categorySlug) ?? categorySlug}
                </p>
                <p className="text-xs text-slate-500">categorySlug: {categorySlug}</p>
              </div>

              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-800 bg-slate-900/80 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Question</th>
                    <th className="px-4 py-3">status</th>
                    <th className="px-4 py-3">order</th>
                    <th className="px-4 py-3">slug</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryQuestions.map((question) => {
                    const id = String(question._id);
                    return (
                      <tr key={id} className="border-b border-slate-800/70 last:border-0">
                        <td className="px-4 py-3 text-slate-200">{question.question}</td>
                        <td className="px-4 py-3 text-slate-400">{question.status}</td>
                        <td className="px-4 py-3 text-slate-400">{question.order ?? 0}</td>
                        <td className="px-4 py-3 text-slate-400">{question.slug}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Link
                              href={`/admin/questions/${id}/edit`}
                              className="text-blue-300 underline hover:text-blue-200"
                            >
                              Редагувати
                            </Link>
                            <ConfirmActionButton
                              action={deleteQuestionAction}
                              fieldName="questionId"
                              fieldValue={id}
                              buttonLabel="Видалити"
                              title="Видалити питання?"
                              description="Цю дію неможливо скасувати. Питання буде видалено з бази даних."
                              confirmLabel="Видалити"
                              cancelLabel="Скасувати"
                              variant="danger"
                              className="text-rose-300 underline hover:text-rose-200"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
