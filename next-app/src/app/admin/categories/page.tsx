import Link from "next/link";
import { connectToDatabase } from "@/lib/mongodb";
import CategoryModel from "@/models/Category";
import GroupModel from "@/models/Group";
import ConfirmActionButton from "@/components/admin/ConfirmActionButton";
import { deleteCategoryAction } from "@/app/admin/categories/actions";

interface Props {
  searchParams: Promise<{ success?: string; error?: string }>;
}

export default async function AdminCategoriesPage({ searchParams }: Props) {
  const query = await searchParams;
  await connectToDatabase();
  const [categories, groups] = await Promise.all([
    CategoryModel.find().sort({ groupSlug: 1, order: 1, title: 1 }).lean(),
    GroupModel.find().sort({ order: 1, title: 1 }).lean(),
  ]);

  const groupBySlug = new Map(groups.map((group) => [group.slug, group.title]));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Категорії</h1>
          <p className="mt-1 text-sm text-slate-400">Список усіх категорій питань.</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Створити категорію
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

      {categories.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
          <p className="text-sm text-slate-400">Поки немає категорій.</p>
          <Link
            href="/admin/categories/new"
            className="mt-3 inline-block text-sm text-blue-300 underline hover:text-blue-200"
          >
            Створити категорію
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-800 bg-slate-900/80 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3">title</th>
                <th className="px-4 py-3">slug</th>
                <th className="px-4 py-3">group</th>
                <th className="px-4 py-3">description</th>
                <th className="px-4 py-3">order</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => {
                const id = String(category._id);
                return (
                  <tr key={id} className="border-b border-slate-800/70 last:border-0">
                    <td className="px-4 py-3 text-slate-200">{category.title}</td>
                    <td className="px-4 py-3 text-slate-400">{category.slug}</td>
                    <td className="px-4 py-3 text-slate-400">
                      {groupBySlug.get(category.groupSlug) ?? category.groupSlug}
                    </td>
                    <td className="px-4 py-3 text-slate-400">{category.description || "-"}</td>
                    <td className="px-4 py-3 text-slate-400">{category.order ?? 0}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/categories/${id}/edit`}
                        className="text-blue-300 underline hover:text-blue-200"
                      >
                        Редагувати
                      </Link>
                        <ConfirmActionButton
                          action={deleteCategoryAction}
                          fieldName="categoryId"
                          fieldValue={id}
                          buttonLabel="Видалити"
                          title="Видалити категорію?"
                          description="Категорію можна видалити тільки якщо до неї не привʼязані питання."
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
        </div>
      )}
    </div>
  );
}
