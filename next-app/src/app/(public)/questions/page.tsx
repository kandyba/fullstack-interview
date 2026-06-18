import Link from "next/link";
import { getGroupedCategories } from "@/lib/interview";
import PageContainer from "@/components/PageContainer";
import ScrollToTopButton from "@/components/questions/ScrollToTopButton";

export const dynamic = "force-dynamic";

export default async function QuestionsPage() {
  const groupedCategories = await getGroupedCategories();
  return (
    <div className="min-h-screen bg-slate-950">
      <PageContainer>
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-1">Запитання</h1>
          <p className="text-slate-400 text-sm">Оберіть тему для підготовки</p>
        </div>

        {groupedCategories.length === 0 ? (
          <p className="text-slate-500 text-sm">Теми поки не додані.</p>
        ) : (
          <div className="space-y-8">
            {groupedCategories.map(({ group, categories }) => (
              <section key={group.slug} className="space-y-3">
                <div>
                  <h2 className="text-xl font-semibold text-slate-100">{group.title}</h2>
                  {group.description && (
                    <p className="mt-1 text-sm text-slate-400">{group.description}</p>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/questions/${category.slug}`}
                      className="px-5 py-2.5 rounded-full bg-slate-800 border border-slate-700 text-slate-200 text-sm font-medium hover:bg-slate-700 hover:border-blue-500 hover:text-white transition-colors"
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        <ScrollToTopButton />
      </PageContainer>
    </div>
  );
}
