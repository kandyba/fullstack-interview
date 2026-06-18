import Link from "next/link";
import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import CategoryModel from "@/models/Category";
import GroupModel from "@/models/Group";
import CategoryForm from "@/components/admin/CategoryForm";
import { updateCategoryAction } from "@/app/admin/categories/actions";
import type { Category } from "@/types/interview";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    success?: string;
    error?: string;
    slug?: string;
  }>;
}

export default async function EditCategoryAdminPage({ params, searchParams }: Props) {
  const { id } = await params;
  const query = await searchParams;

  await connectToDatabase();
  const [categoryDoc, groups] = await Promise.all([
    CategoryModel.findById(id).lean(),
    GroupModel.find().sort({ order: 1, title: 1 }).lean(),
  ]);

  if (!categoryDoc) {
    notFound();
  }

  const initialData: Category = {
    ...(categoryDoc as unknown as Category),
    _id: String(categoryDoc._id),
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Редагувати категорію</h1>
        <p className="mt-1 text-sm text-slate-400">Оновлення існуючої категорії в MongoDB.</p>
      </div>

      {query.error && (
        <div className="mb-4 rounded-lg border border-rose-900/50 bg-rose-950/30 px-4 py-3 text-sm text-rose-300">
          {query.error}
        </div>
      )}

      {query.success === "1" && (
        <div className="mb-4 rounded-lg border border-emerald-900/50 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-300">
          <p>Категорію успішно оновлено.</p>
          <Link href="/admin/categories" className="mt-2 inline-block text-emerald-200 underline hover:text-emerald-100">
            Назад до /admin/categories
          </Link>
        </div>
      )}

      <CategoryForm
        mode="edit"
        initialData={initialData}
        formAction={updateCategoryAction}
        groups={groups.map((group) => ({ slug: group.slug, title: group.title }))}
        submitLabel="Зберегти зміни"
      />
    </div>
  );
}
