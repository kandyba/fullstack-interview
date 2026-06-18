import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getQuestionsByCategorySlug,
  paginateQuestions,
} from "@/lib/interview";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import PageContainer from "@/components/PageContainer";
import ScrollToTopButton from "@/components/questions/ScrollToTopButton";
import PageSizeSelect from "@/components/questions/PageSizeSelect";

export const dynamic = "force-dynamic";

const DEFAULT_PER_PAGE = 20;
const ALLOWED_PER_PAGE = new Set([20, 50, 100]);

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; perPage?: string }>;
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page: pageParam, perPage: perPageParam } = await searchParams;
  const rawPage = parseInt(pageParam ?? "1", 10);
  const page = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;
  const rawPerPage = parseInt(perPageParam ?? String(DEFAULT_PER_PAGE), 10);
  const perPage = ALLOWED_PER_PAGE.has(rawPerPage)
    ? rawPerPage
    : DEFAULT_PER_PAGE;

  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const allQuestions = await getQuestionsByCategorySlug(slug);
  const { items: questions, page: currentPage, totalPages, start } =
    paginateQuestions(allQuestions, page, perPage);

  const buildPageHref = (nextPage: number) =>
    `/questions/${slug}?page=${nextPage}&perPage=${perPage}`;

  return (
    <div className="min-h-screen bg-slate-950">
      <PageContainer>
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-1">{category.title}</h1>
          {category.description && (
            <p className="text-slate-400 text-sm mb-2">{category.description}</p>
          )}
          <p className="text-xs text-slate-600 uppercase tracking-wide">
            {allQuestions.length} питань
          </p>
          <div className="mt-4">
            <PageSizeSelect value={perPage} />
          </div>
        </div>

        {questions.length === 0 ? (
          <p className="text-slate-500 text-sm">У цій темі поки немає питань.</p>
        ) : (
          <div className="space-y-6">
            {questions.map((question, index) => (
              <div
                key={question.slug}
                className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden"
              >
                <div className="px-6 py-5 border-b border-slate-800">
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-700 text-slate-300 text-xs font-bold">
                      {start + index + 1}
                    </span>
                    <h2 className="text-base font-semibold text-white leading-snug">
                      {question.question}
                    </h2>
                  </div>
                </div>

                <div className="px-6 py-5 space-y-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
                      Коротка відповідь
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {question.shortAnswer}
                    </p>
                  </div>

                  <div className="bg-slate-900/30 border border-slate-700 rounded-lg px-5 py-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
                      Розгорнута відповідь
                    </p>
                    <MarkdownRenderer content={question.fullAnswer} />
                  </div>

                  {question.trickyQuestion?.question && (
                    <div className="rounded-lg bg-amber-950/20 border border-amber-900/40 px-5 py-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">
                        Підступне питання
                      </p>
                      <h3 className="text-sm font-semibold text-slate-200 mb-2">
                        {question.trickyQuestion.question}
                      </h3>
                      {question.trickyQuestion.answer && (
                        <div className="text-sm text-slate-300">
                          <MarkdownRenderer content={question.trickyQuestion.answer} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-between">
            {currentPage > 1 ? (
              <Link
                href={buildPageHref(currentPage - 1)}
                className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-sm hover:bg-slate-700 transition-colors"
              >
                ← Попередня
              </Link>
            ) : (
              <span className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-600 text-sm cursor-not-allowed">
                ← Попередня
              </span>
            )}

            <span className="text-slate-500 text-sm">
              Сторінка {currentPage} з {totalPages}
            </span>

            {currentPage < totalPages ? (
              <Link
                href={buildPageHref(currentPage + 1)}
                className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-sm hover:bg-slate-700 transition-colors"
              >
                Наступна →
              </Link>
            ) : (
              <span className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-600 text-sm cursor-not-allowed">
                Наступна →
              </span>
            )}
          </div>
        )}

        <ScrollToTopButton />
      </PageContainer>
    </div>
  );
}
