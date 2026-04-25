import React from 'react';
import { getAllLeafTopics } from '../data/topics';
import { useLanguage } from '../contexts/LanguageContext';

const TopNavBar = ({ selectedTopic, onSelectTopic, onShowFavorites, showingFavorites }) => {
  const allTopics = getAllLeafTopics();
  const { t } = useLanguage();

  const getLevelBadgeClass = (level) => {
    if (!level) return '';
    if (level.includes('Junior')) return 'level-junior';
    if (level === 'Middle') return 'level-middle';
    if (level === 'Senior') return 'level-senior';
    if (level.includes('Middle') && level.includes('Senior')) return 'level-middle-senior';
    return 'level-all';
  };

  return (
    <div className="sticky top-18.25 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto max-w-450 px-4 py-3 md:px-6">
        <div className={[
          'flex flex-nowrap items-center gap-2 overflow-x-auto',
          'pb-1 md:flex-wrap md:overflow-visible',
        ].join(' ')}>
          <button
            className={`inline-flex shrink-0 cursor-pointer items-center rounded-full border px-4 py-2 text-sm font-semibold transition ${
              showingFavorites
                ? 'border-emerald-500 bg-emerald-500 text-white'
                : 'border-slate-200 bg-slate-100 text-slate-700 hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-emerald-300'
            }`}
            onClick={onShowFavorites}
          >
            {t('saved')}
          </button>

          <div className="mx-1 h-6 w-px shrink-0 bg-slate-300 dark:bg-slate-700"></div>

          {allTopics.map((topic) => (
            <button
              key={topic.id}
              className={`inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                selectedTopic?.id === topic.id
                  ? 'border-emerald-500 bg-emerald-500 text-white'
                  : 'border-slate-200 bg-slate-100 text-slate-700 hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-emerald-300'
              }`}
              onClick={() => onSelectTopic(topic)}
              title={`${topic.title}${topic.level ? ` (${topic.level})` : ''}`}
            >
              {topic.icon && <span>{topic.icon}</span>}
              <span className="whitespace-nowrap">{topic.title}</span>
              {topic.level && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                    selectedTopic?.id === topic.id
                      ? 'bg-white/25 text-white'
                      : getLevelBadgeClass(topic.level) === 'level-junior'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        : getLevelBadgeClass(topic.level) === 'level-middle'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                          : getLevelBadgeClass(topic.level) === 'level-senior'
                            ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300'
                            : getLevelBadgeClass(topic.level) === 'level-middle-senior'
                              ? 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300'
                              : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {topic.level}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
