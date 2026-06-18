import Link from "next/link";
import { createCategoryAction } from "@/app/admin/categories/actions";
import CategoryForm from "@/components/admin/CategoryForm";
import { connectToDatabase } from "@/lib/mongodb";
import GroupModel from "@/models/Group";

interface Props {
  searchParams: Promise<{
    success?: string;
    error?: string;
    slug?: string;
  }>;
}

export default async function NewCategoryAdminPage({ searchParams }: Props) {
  await connectToDatabase();
  const groups = await GroupModel.find().sort({ order: 1, title: 1 }).lean();

  const params = await searchParams;
  const error = params.error;
  const success = params.success === "1";
  const createdSlug = params.slug;

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Нова категорія</h1>
        <p className="mt-1 text-sm text-slate-400">
          Створення нової категорії в колекції categories.
        </p>
      </div>

      <div className="mb-4 rounded-lg border border-slate-800 bg-slate-900/50 px-4 py-3 text-sm text-slate-300">
        Slug категорії використовується як categorySlug у питаннях. Наприклад,
        категорія зі slug &quot;react&quot; буде пов&apos;язана з питаннями, у яких
        categorySlug = &quot;react&quot;.
      </div>

      {groups.length === 0 && (
        <div className="mb-4 rounded-lg border border-amber-900/50 bg-amber-950/30 px-4 py-3 text-sm text-amber-200">
          Немає жодної group. Спочатку створи групу у /admin/groups/new.
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-lg border border-rose-900/50 bg-rose-950/30 px-4 py-3 text-sm text-rose-300">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-lg border border-emerald-900/50 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-300">
          <p>Категорію успішно створено.</p>
          {createdSlug && (
            <p className="mt-1">
              Slug: <span className="font-semibold">{createdSlug}</span>
            </p>
          )}
          <Link
            href="/questions"
            className="mt-2 inline-block text-emerald-200 underline hover:text-emerald-100"
          >
            Перейти до сторінки /questions
          </Link>
        </div>
      )}

      <CategoryForm
        mode="create"
        formAction={createCategoryAction}
        groups={groups.map((group) => ({ slug: group.slug, title: group.title }))}
        submitLabel="Створити категорію"
      />
    </div>
  );
}
