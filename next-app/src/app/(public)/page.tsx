import Link from "next/link";
import { getAllCategories, getAllQuestions } from "@/lib/interview";

export default async function Home() {
  const [categories, questions] = await Promise.all([
    getAllCategories(),
    getAllQuestions(),
  ]);
  const topicCount = categories.length;
  const questionCount = questions.length;

  return (
    <div className="min-h-[calc(100vh-56px)] bg-slate-950 flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <span className="inline-block mb-6 px-3 py-1 rounded-full border border-slate-700 text-xs font-medium text-slate-400 tracking-widest uppercase">
          Fullstack Interview
        </span>

        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white mb-5 leading-tight">
          Interview <span className="text-blue-400">Prep</span>
        </h1>

        <p className="text-lg text-slate-400 mb-10 leading-relaxed">
          Особистий застосунок для систематичної підготовки до технічних
          співбесід. Вивчай теми, переглядай відповіді, фіксуй прогрес.
        </p>

        <div className="inline-flex items-center gap-8 mb-10 px-6 py-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">{topicCount}</div>
            <div className="text-xs text-slate-500 mt-0.5 uppercase tracking-wide">тем</div>
          </div>
          <div className="w-px h-8 bg-slate-700" />
          <div className="text-center">
            <div className="text-3xl font-bold text-white">{questionCount}</div>
            <div className="text-xs text-slate-500 mt-0.5 uppercase tracking-wide">питань</div>
          </div>
        </div>

        <div>
          <Link
            href="/questions"
            className="inline-block px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors text-sm"
          >
            Перейти до запитань →
          </Link>
        </div>
      </div>
    </div>
  );
}
