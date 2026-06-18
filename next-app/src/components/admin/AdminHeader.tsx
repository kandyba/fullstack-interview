import Link from "next/link";

export default function AdminHeader() {
  return (
    <header className="border-b border-slate-800 bg-slate-900/60 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-sm font-semibold uppercase tracking-widest text-slate-300">
          Admin Panel
        </h1>
        <Link
          href="/"
          className="text-sm text-slate-300 hover:text-white hover:underline"
        >
          На сайт
        </Link>
      </div>
    </header>
  );
}
