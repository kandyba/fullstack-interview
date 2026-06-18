import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-slate-950 border-b border-slate-800 px-4 py-0">
      <div className="max-w-5xl mx-auto flex items-center justify-between h-14">
        <Link
          href="/"
          className="text-lg font-bold text-white tracking-tight hover:text-blue-400 transition-colors"
        >
          Interview Prep
        </Link>
        <nav className="flex items-stretch h-full gap-1">
          <Link
            href="/"
            className="flex items-center px-4 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Головна
          </Link>
          <Link
            href="/questions"
            className="flex items-center px-4 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Запитання
          </Link>
          <Link
            href="/admin"
            className="flex items-center px-4 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Адмінка
          </Link>
        </nav>
        <span className="ml-4 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-700/40">
          Premium
        </span>
      </div>
    </header>
  );
}

