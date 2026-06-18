import {
  getAllCategories,
  getAllGroups,
  getAllQuestions,
  getGroupedCategories,
} from "@/lib/interview";
import { connectToDatabase } from "@/lib/mongodb";
import QuestionModel from "@/models/Question";

export default async function AdminDashboardPage() {
  await connectToDatabase();

  const [groups, categories, allQuestions, groupedCategories, allQuestionsInDB] =
    await Promise.all([
      getAllGroups(),
      getAllCategories(),
      getAllQuestions(),
      getGroupedCategories(),
      QuestionModel.find(),
    ]);

  const publishedCount = allQuestions.length;
  const draftCount = allQuestionsInDB.length - publishedCount;

  // Порахуємо питання за категоріями
  const questionsByCategory = new Map<string, number>();
  for (const question of allQuestionsInDB) {
    const slug = (question as any).categorySlug;
    questionsByCategory.set(slug, (questionsByCategory.get(slug) ?? 0) + 1);
  }

  // Топ категорій за кількістю запитань
  const topCategories = categories
    .map((cat) => ({
      ...cat,
      questionCount: questionsByCategory.get(cat.slug) ?? 0,
    }))
    .sort((a, b) => b.questionCount - a.questionCount)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Заголовок */}
      <div>
        <h1 className="text-3xl font-bold text-white">Адмін Дашборд</h1>
        <p className="mt-1 text-sm text-slate-400">
          Огляд структури контенту та статистики.
        </p>
      </div>

      {/* 📊 Статистичні карточки */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Групи" value={groups.length} color="from-blue-600" />
        <StatCard
          label="Категорії"
          value={categories.length}
          color="from-purple-600"
        />
        <StatCard
          label="Опубліковано питань"
          value={publishedCount}
          color="from-green-600"
        />
        <StatCard
          label="Чернетки"
          value={draftCount}
          color="from-amber-600"
        />
      </div>

      {/* 📈 Розбивка: Групи → Категорії */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        <h2 className="mb-6 text-xl font-semibold text-white">
          Структура: Групи та Категорії
        </h2>
        <div className="space-y-6">
          {groupedCategories.length > 0 ? (
            groupedCategories.map((item) => (
              <div key={item.group.slug} className="rounded-lg bg-slate-800/30 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">
                      {item.group.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {item.group.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-400">
                      {item.categories.length}
                    </p>
                    <p className="text-xs text-slate-500">категорій</p>
                  </div>
                </div>

                {/* Категорії у групі */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.categories.map((cat) => {
                    const qCount = questionsByCategory.get(cat.slug) ?? 0;
                    return (
                      <div
                        key={cat.slug}
                        className="rounded bg-slate-700/50 px-3 py-2 text-sm"
                      >
                        <p className="text-slate-200">{cat.title}</p>
                        <p className="text-xs text-slate-400">
                          {qCount} {qCount === 1 ? "питання" : "питань"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-400">Немає даних про групи</p>
          )}
        </div>
      </div>

      {/* 🏆 Топ категорій */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        <h2 className="mb-6 text-xl font-semibold text-white">
          Топ категорій за кількістю питань
        </h2>
        <div className="space-y-3">
          {topCategories.map((cat, idx) => (
            <div key={cat.slug} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-slate-500">
                  #{idx + 1}
                </span>
                <div>
                  <p className="font-medium text-white">{cat.title}</p>
                  <p className="text-xs text-slate-500">{cat.slug}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ProgressBar
                  current={cat.questionCount}
                  max={Math.max(...topCategories.map((c) => c.questionCount))}
                />
                <span className="min-w-[60px] text-right text-xl font-semibold text-green-400">
                  {cat.questionCount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// UI компоненти
function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
      <p className="text-xs uppercase tracking-wider text-slate-500">{label}</p>
      <p className={`mt-2 text-3xl font-bold bg-linear-to-r ${color} to-transparent bg-clip-text text-transparent`}>
        {value}
      </p>
    </div>
  );
}

function ProgressBar({
  current,
  max,
}: {
  current: number;
  max: number;
}) {
  const percentage = (current / Math.max(max, 1)) * 100;
  return (
    <div className="h-2 w-40 overflow-hidden rounded-full bg-slate-700">
      <div
        className="h-full bg-linear-to-r from-green-500 to-green-400 transition-all"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
