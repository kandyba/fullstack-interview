import Link from "next/link";
import { createGroupAction } from "@/app/admin/groups/actions";

interface Props {
  searchParams: Promise<{
    success?: string;
    error?: string;
    slug?: string;
  }>;
}

export default async function NewGroupAdminPage({ searchParams }: Props) {
  const params = await searchParams;
  const error = params.error;
  const success = params.success === "1";
  const createdSlug = params.slug;

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Нова group</h1>
        <p className="mt-1 text-sm text-slate-400">Створення верхнього рівня навігації для категорій.</p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-rose-900/50 bg-rose-950/30 px-4 py-3 text-sm text-rose-300">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-lg border border-emerald-900/50 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-300">
          <p>Group успішно створено.</p>
          {createdSlug && (
            <p className="mt-1">
              Slug: <span className="font-semibold">{createdSlug}</span>
            </p>
          )}
          <div className="mt-2 flex gap-4">
            <Link
              href="/admin/groups"
              className="text-emerald-200 underline hover:text-emerald-100"
            >
              До списку groups
            </Link>
            <Link
              href="/admin/categories/new"
              className="text-emerald-200 underline hover:text-emerald-100"
            >
              Створити категорію
            </Link>
          </div>
        </div>
      )}

      <form
        action={createGroupAction}
        className="rounded-xl border border-slate-800 bg-slate-900/50 p-6"
      >
        <div className="grid gap-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-200" htmlFor="title">
              Назва group
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="Frontend"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-200" htmlFor="slug">
              Slug
            </label>
            <input
              id="slug"
              name="slug"
              type="text"
              required
              placeholder="frontend"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-200" htmlFor="description">
              Опис
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Категорії для frontend співбесід."
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-200" htmlFor="order">
              Порядок
            </label>
            <input
              id="order"
              name="order"
              type="number"
              defaultValue={0}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Створити group
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
