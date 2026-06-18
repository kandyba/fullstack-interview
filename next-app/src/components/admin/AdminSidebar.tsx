import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="w-60 min-h-screen shrink-0 border-r border-slate-800 bg-slate-900/40 p-4">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
        Admin Menu
      </p>
      <nav className="space-y-1">
        <Link
          href="/admin"
          className="block rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          Dashboard
        </Link>
        <Link
          href="/admin/questions"
          className="block rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          Питання
        </Link>
        <Link
          href="/admin/categories"
          className="block rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          Категорії
        </Link>
        <Link
          href="/admin/groups"
          className="block rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          Groups
        </Link>
        <Link
          href="/"
          className="block rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          На сайт
        </Link>
      </nav>
    </aside>
  );
}
