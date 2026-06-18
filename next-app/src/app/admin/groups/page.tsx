import Link from "next/link";
import { connectToDatabase } from "@/lib/mongodb";
import GroupModel from "@/models/Group";
import ConfirmActionButton from "@/components/admin/ConfirmActionButton";
import { deleteGroupAction } from "@/app/admin/groups/actions";

interface Props {
  searchParams: Promise<{ success?: string; error?: string }>;
}

export default async function AdminGroupsPage({ searchParams }: Props) {
  const query = await searchParams;
  await connectToDatabase();
  const groups = await GroupModel.find().sort({ order: 1, title: 1 }).lean();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Групи</h1>
          <p className="mt-1 text-sm text-slate-400">Верхній рівень навігації для категорій.</p>
        </div>
        <Link
          href="/admin/groups/new"
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Створити group
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

      {groups.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
          <p className="text-sm text-slate-400">Поки немає groups.</p>
          <Link
            href="/admin/groups/new"
            className="mt-3 inline-block text-sm text-blue-300 underline hover:text-blue-200"
          >
            Створити group
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-800 bg-slate-900/80 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3">title</th>
                <th className="px-4 py-3">slug</th>
                <th className="px-4 py-3">description</th>
                <th className="px-4 py-3">order</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => {
                const id = String(group._id);
                return (
                  <tr key={id} className="border-b border-slate-800/70 last:border-0">
                    <td className="px-4 py-3 text-slate-200">{group.title}</td>
                    <td className="px-4 py-3 text-slate-400">{group.slug}</td>
                    <td className="px-4 py-3 text-slate-400">{group.description || "-"}</td>
                    <td className="px-4 py-3 text-slate-400">{group.order ?? 0}</td>
                    <td className="px-4 py-3">
                      <ConfirmActionButton
                        action={deleteGroupAction}
                        fieldName="groupId"
                        fieldValue={id}
                        buttonLabel="Видалити"
                        title="Видалити group?"
                        description="Group можна видалити тільки якщо в ній немає категорій."
                        confirmLabel="Видалити"
                        cancelLabel="Скасувати"
                        variant="danger"
                        className="text-rose-300 underline hover:text-rose-200"
                      />
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
