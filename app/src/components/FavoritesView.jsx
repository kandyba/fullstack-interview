import React, { useState, useEffect } from 'react';
import { Star, FileQuestion } from 'lucide-react';
import { loadFavorites, removeFavorite } from '../utils/favorites';
import { findTopicById } from '../data/topics';
import { loadTopicContent } from '../services/contentService';
import { useLanguage } from '../contexts/LanguageContext';

const buildGroupedFavorites = async (favorites) => {
  const grouped = {};

  for (const fav of favorites) {
    const topic = findTopicById(fav.topicId);
    if (!topic || !topic.file) continue;

    try {
      const parsed = await loadTopicContent(topic);
      const question = parsed.questions.find((q) => q.id === fav.questionId);

      if (question) {
        if (!grouped[topic.id]) {
          grouped[topic.id] = {
            topic,
            questions: []
          };
        }

        grouped[topic.id].questions.push({
          ...question,
          favoriteData: fav
        });
      }
    } catch (error) {
      console.error('Error loading favorite:', error);
    }
  }

  return grouped;
};

const FavoritesView = ({ onSelectTopic, refreshTrigger }) => {
  const [favorites, setFavorites] = useState([]);
  const [groupedFavorites, setGroupedFavorites] = useState({});
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const loadFavoriteQuestions = async () => {
      setLoading(true);
      const favs = loadFavorites();
      
      if (favs.length === 0) {
        setLoading(false);
        setFavorites([]);
        setGroupedFavorites({});
        return;
      }

      const grouped = await buildGroupedFavorites(favs);

      setGroupedFavorites(grouped);
      setFavorites(favs);
      setLoading(false);
    };

    loadFavoriteQuestions();
  }, [refreshTrigger]);

  const handleRemoveFavorite = async (questionId, topicId) => {
    removeFavorite(questionId, topicId);
    
    // Re-fetch and update immediately
    setLoading(true);
    const favs = loadFavorites();
    
    if (favs.length === 0) {
      setFavorites([]);
      setGroupedFavorites({});
      setLoading(false);
      return;
    }

    const grouped = await buildGroupedFavorites(favs);

    setGroupedFavorites(grouped);
    setFavorites(favs);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-4 py-10">
        <div className="text-center text-slate-500 dark:text-slate-400">
          <FileQuestion size={48} />
          <p>{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-4 py-10">
        <div className="text-center text-slate-500 dark:text-slate-400">
          <div className="mb-3 flex justify-center">
            <Star size={64} />
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">{t('noFavorites')}</h2>
          <p>{t('noFavoritesHint')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 overflow-y-auto px-4 py-6">
      <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
        <h1 className="flex items-center gap-3 text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">
          <Star size={32} fill="currentColor" />
          {t('favoritesTitle')}
        </h1>
        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          {favorites.length} {t('questionsCount')}
        </span>
      </div>

      {Object.entries(groupedFavorites).map(([topicId, data]) => (
        <div key={topicId} className="mb-10">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3 dark:border-slate-800">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
              {data.topic.icon && <span>{data.topic.icon}</span>}
              {data.topic.title}
            </h2>
            <button
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-emerald-600 transition hover:border-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-emerald-300"
              onClick={() => onSelectTopic(data.topic)}
            >
              Переглянути всі →
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {data.questions.map((question, index) => (
              <div key={question.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
                <div className="mb-4 flex items-start gap-3">
                  <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg bg-emerald-500 px-2 text-sm font-semibold text-white">{index + 1}</span>
                  <h3 className="flex-1 text-lg font-semibold leading-7 text-slate-900 dark:text-slate-100" dangerouslySetInnerHTML={{ __html: question.question }} />
                  <button
                    className="rounded-lg p-1.5 text-amber-500 transition hover:text-amber-600"
                    onClick={() => handleRemoveFavorite(question.id, topicId)}
                    aria-label="Remove from favorites"
                    title="Прибрати зі збережених"
                  >
                    <Star size={20} fill="currentColor" />
                  </button>
                </div>
                <div className="content-prose text-[15px] text-slate-700 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: question.answer }} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoritesView;
